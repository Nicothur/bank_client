export interface Block{
    index: number;
    timestamp: number;
    data: Object;
    signature: String;
    proofOfWork: String;
    hash: String;
    previousHash: String;
}