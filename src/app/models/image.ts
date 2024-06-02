export interface Probability {
    index: number,
    name: string,
    label: string,
    prob: number
}

export interface Result {
    probs: Probability[],
    time: number
}

export interface Details {
    detail?: string | null,
    probability?: Probability[],
    time?: number
}

export interface LocalFile {
    name: string,
    path: string,
    data: string,
    edited: string,
    details: Details
}

export interface ClassName {
    id: number,
    name: string
}