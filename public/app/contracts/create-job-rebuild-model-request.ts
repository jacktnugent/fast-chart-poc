export class CreateJobRebuildModelRequest {
    jobType: string;
    analyticId: string;
    modelId: string;

    constructor(jobType: string, assetId: string, modelId: string){
        this.jobType = jobType;
        this.analyticId = assetId;
        this.modelId = modelId;
    }
}