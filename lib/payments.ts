import { supabase } from "./supabase"

// ==================== TIPOS ====================
export interface Contract {
  id: string
  project_id: string
  client_id: string
  freelancer_id: string
  proposal_id: string
  title: string
  description?: string
  total_amount: number
  platform_fee: number
  freelancer_amount: number
  status: "pending" | "active" | "completed" | "cancelled" | "disputed"
  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  contract_id: string
  payer_id: string
  amount: number
  platform_fee: number
  payment_method: string
  status: "pending" | "processing" | "completed" | "failed" | "refunded"
  stripe_payment_intent_id?: string
  escrow_released: boolean
  created_at: string
  updated_at: string
}

export interface Wallet {
  id: string
  user_id: string
  available_balance: number
  pending_balance: number
  total_earned: number
  total_spent: number
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  contract_id: string
  invoice_number: string
  client_id: string
  freelancer_id: string
  subtotal: number
  platform_fee: number
  tax_amount: number
  total_amount: number
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
  due_date?: string
  paid_at?: string
  created_at: string
  updated_at: string
}

// ==================== CONTRATOS ====================
export const contractsAPI = {
  // Crear contrato desde propuesta aceptada
  async createFromProposal(proposalId: string) {
    // Obtener datos de la propuesta
    const { data: proposal, error: proposalError } = await supabase
      .from("proposals")
      .select(`
        *,
        project:projects(*),
        freelancer:users!proposals_freelancer_id_fkey(*)
      `)
      .eq("id", proposalId)
      .single()

    if (proposalError) throw proposalError

    // Calcular montos (7% comisión de plataforma)
    const totalAmount = proposal.proposed_rate
    const platformFee = totalAmount * 0.07
    const freelancerAmount = totalAmount - platformFee

    const contractData = {
      project_id: proposal.project_id,
      client_id: proposal.project.client_id,
      freelancer_id: proposal.freelancer_id,
      proposal_id: proposalId,
      title: proposal.project.title,
      description: proposal.project.description,
      total_amount: totalAmount,
      platform_fee: platformFee,
      freelancer_amount: freelancerAmount,
      status: "pending" as const,
      start_date: new Date().toISOString().split("T")[0],
    }

    const { data, error } = await supabase.from("contracts").insert([contractData]).select().single()

    if (error) throw error

    // Actualizar estado de la propuesta
    await supabase.from("proposals").update({ status: "accepted" }).eq("id", proposalId)

    // Actualizar estado del proyecto
    await supabase.from("projects").update({ status: "in_progress" }).eq("id", proposal.project_id)

    return data
  },

  // Obtener contratos del usuario
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("contracts")
      .select(`
        *,
        project:projects(title, description),
        client:users!contracts_client_id_fkey(full_name, avatar_url),
        freelancer:users!contracts_freelancer_id_fkey(full_name, avatar_url),
        payments(*)
      `)
      .or(`client_id.eq.${userId},freelancer_id.eq.${userId}`)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  // Obtener contrato por ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from("contracts")
      .select(`
        *,
        project:projects(*),
        client:users!contracts_client_id_fkey(*),
        freelancer:users!contracts_freelancer_id_fkey(*),
        payments(*),
        invoices(*)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  },

  // Actualizar estado del contrato
  async updateStatus(id: string, status: Contract["status"]) {
    const { data, error } = await supabase.from("contracts").update({ status }).eq("id", id).select().single()

    if (error) throw error
    return data
  },
}

// ==================== PAGOS ====================
export const paymentsAPI = {
  // Simular procesamiento de pago
  async processPayment(contractId: string, payerId: string, paymentMethod = "credit_card") {
    // Obtener datos del contrato
    const { data: contract, error: contractError } = await supabase
      .from("contracts")
      .select("*")
      .eq("id", contractId)
      .single()

    if (contractError) throw contractError

    const platformFee = contract.total_amount * 0.07

    const paymentData = {
      contract_id: contractId,
      payer_id: payerId,
      amount: contract.total_amount,
      platform_fee: platformFee,
      payment_method: paymentMethod,
      status: "processing" as const,
      stripe_payment_intent_id: `pi_sim_${Date.now()}`, // Simulado
      escrow_released: false,
    }

    const { data: payment, error } = await supabase.from("payments").insert([paymentData]).select().single()

    if (error) throw error

    // Simular procesamiento exitoso después de 2 segundos
    setTimeout(async () => {
      await supabase.from("payments").update({ status: "completed" }).eq("id", payment.id)

      // Crear transacción de escrow
      await transactionsAPI.createEscrowHold(payment.id, contract.freelancer_id, contract.freelancer_amount)

      // Actualizar contrato a activo
      await contractsAPI.updateStatus(contractId, "active")

      // Crear factura
      await invoicesAPI.createFromContract(contractId)
    }, 2000)

    return payment
  },

  // Liberar fondos del escrow
  async releaseEscrow(paymentId: string) {
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .select(`
        *,
        contract:contracts(freelancer_id, freelancer_amount)
      `)
      .eq("id", paymentId)
      .single()

    if (paymentError) throw paymentError

    // Actualizar pago
    await supabase.from("payments").update({ escrow_released: true }).eq("id", paymentId)

    // Crear transacción de liberación
    await transactionsAPI.createEscrowRelease(
      paymentId,
      payment.contract.freelancer_id,
      payment.contract.freelancer_amount,
    )

    // Actualizar wallet del freelancer
    await walletsAPI.addFunds(payment.contract.freelancer_id, payment.contract.freelancer_amount)

    return true
  },

  // Obtener pagos por contrato
  async getByContractId(contractId: string) {
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("contract_id", contractId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },
}

// ==================== TRANSACCIONES ====================
export const transactionsAPI = {
  // Crear transacción de retención en escrow
  async createEscrowHold(paymentId: string, freelancerId: string, amount: number) {
    const transactionData = {
      payment_id: paymentId,
      to_user_id: freelancerId,
      amount: amount,
      transaction_type: "escrow_hold" as const,
      status: "completed" as const,
      description: `Fondos retenidos en escrow por $${amount.toLocaleString("es-CL")}`,
    }

    const { data, error } = await supabase.from("transactions").insert([transactionData]).select().single()

    if (error) throw error
    return data
  },

  // Crear transacción de liberación de escrow
  async createEscrowRelease(paymentId: string, freelancerId: string, amount: number) {
    const transactionData = {
      payment_id: paymentId,
      to_user_id: freelancerId,
      amount: amount,
      transaction_type: "escrow_release" as const,
      status: "completed" as const,
      description: `Fondos liberados del escrow: $${amount.toLocaleString("es-CL")}`,
    }

    const { data, error } = await supabase.from("transactions").insert([transactionData]).select().single()

    if (error) throw error
    return data
  },

  // Obtener historial de transacciones del usuario
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },
}

// ==================== WALLETS ====================
export const walletsAPI = {
  // Obtener wallet del usuario
  async getByUserId(userId: string) {
    const { data, error } = await supabase.from("wallets").select("*").eq("user_id", userId).single()

    if (error && error.code !== "PGRST116") throw error
    return data
  },

  // Agregar fondos al wallet
  async addFunds(userId: string, amount: number) {
    const { data, error } = await supabase.rpc("add_wallet_funds", {
      user_id: userId,
      amount: amount,
    })

    if (error) {
      // Si la función RPC no existe, usar UPDATE manual
      const { data: wallet } = await supabase.from("wallets").select("*").eq("user_id", userId).single()

      if (wallet) {
        const { data: updated, error: updateError } = await supabase
          .from("wallets")
          .update({
            available_balance: wallet.available_balance + amount,
            total_earned: wallet.total_earned + amount,
          })
          .eq("user_id", userId)
          .select()
          .single()

        if (updateError) throw updateError
        return updated
      }
    }

    return data
  },

  // Retirar fondos
  async withdrawFunds(userId: string, amount: number, withdrawalMethod: string, bankInfo?: any) {
    const withdrawalData = {
      user_id: userId,
      amount: amount,
      withdrawal_method: withdrawalMethod,
      bank_account_info: bankInfo,
      status: "pending" as const,
    }

    const { data, error } = await supabase.from("withdrawals").insert([withdrawalData]).select().single()

    if (error) throw error

    // Reducir balance disponible
    const { data: wallet } = await supabase.from("wallets").select("*").eq("user_id", userId).single()

    if (wallet && wallet.available_balance >= amount) {
      await supabase
        .from("wallets")
        .update({
          available_balance: wallet.available_balance - amount,
          pending_balance: wallet.pending_balance + amount,
        })
        .eq("user_id", userId)
    }

    return data
  },
}

// ==================== FACTURAS ====================
export const invoicesAPI = {
  // Crear factura desde contrato
  async createFromContract(contractId: string) {
    const { data: contract, error: contractError } = await supabase
      .from("contracts")
      .select("*")
      .eq("id", contractId)
      .single()

    if (contractError) throw contractError

    // Generar número de factura
    const { data: invoiceNumber } = await supabase.rpc("generate_invoice_number")

    const taxAmount = contract.total_amount * 0.19 // IVA 19%

    const invoiceData = {
      contract_id: contractId,
      invoice_number: invoiceNumber || `INV-${Date.now()}`,
      client_id: contract.client_id,
      freelancer_id: contract.freelancer_id,
      subtotal: contract.total_amount,
      platform_fee: contract.platform_fee,
      tax_amount: taxAmount,
      total_amount: contract.total_amount + taxAmount,
      status: "sent" as const,
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 días
    }

    const { data, error } = await supabase.from("invoices").insert([invoiceData]).select().single()

    if (error) throw error
    return data
  },

  // Obtener facturas del usuario
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from("invoices")
      .select(`
        *,
        contract:contracts(title),
        client:users!invoices_client_id_fkey(full_name),
        freelancer:users!invoices_freelancer_id_fkey(full_name)
      `)
      .or(`client_id.eq.${userId},freelancer_id.eq.${userId}`)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  },

  // Marcar factura como pagada
  async markAsPaid(id: string) {
    const { data, error } = await supabase
      .from("invoices")
      .update({
        status: "paid",
        paid_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  },
}

// ==================== FUNCIONES DE UTILIDAD ====================
export const paymentUtils = {
  // Calcular comisión de plataforma
  calculatePlatformFee(amount: number, feePercentage = 0.07) {
    return amount * feePercentage
  },

  // Formatear moneda chilena
  formatCurrency(amount: number) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(amount)
  },

  // Calcular fecha de vencimiento
  calculateDueDate(days = 30) {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toISOString().split("T")[0]
  },

  // Validar monto mínimo
  validateMinimumAmount(amount: number, minimum = 5000) {
    return amount >= minimum
  },
}
