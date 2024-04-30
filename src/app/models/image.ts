export interface Probability {
    index: number,
    name: string,
    prob: number
}

export interface Result {
    probs: Probability[]
}

export interface Details {
    detail?: string | null,
    probability?: Probability[]
}

export interface LocalFile {
    name: string,
    path: string,
    data: string,
    edited: string,
    details: Details
}