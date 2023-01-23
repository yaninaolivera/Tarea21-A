export interface Category {
    id: number,
    name: string,
    transaction_type: string,
    color: string,
    icon: string,
    transactions: Transactions[]
}

export interface Transactions {
    id: number,
    amount: number,
    date: string,
    notes: string
}

export interface Results {
    id: number, 
    amount: 0, 
    date: string, 
    type: string,
    operations: Detalle[]
}

export interface Detalle {
    id: number,
    category_id: number,
    description: string,
    amount: number,
    type: string,
    icon: string,
    color: string,
    name: string
}