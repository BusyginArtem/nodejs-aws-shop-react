"use strict";
// import * as cdk from 'aws-cdk-lib';
// import { Construct } from 'constructs';
// import * as s3 from "aws-cdk-lib/aws-s3";
// import * as iam from "aws-cdk-lib/aws-iam";
// import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
// import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfrastructureStack = void 0;
// export class InfrastructureStack extends cdk.Stack {
//   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
//     super(scope, id, props);
//     const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, "CF-OAI");
//     const siteBucket = new s3.Bucket(this, "ResourceBucket", {
//       bucketName: "serving-spa-bucket-cdk",
//       websiteIndexDocument: "index.html",
//       publicReadAccess: false,
//       blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
//     });
//     siteBucket.addToResourcePolicy(
//       new iam.PolicyStatement({
//         actions: ["S3:GetObject"],
//         resources: [siteBucket.arnForObjects("*")],
//         principals: [
//           new iam.CanonicalUserPrincipal(
//             cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
//           ),
//         ],
//       })
//     );
//     const distribution = new cloudfront.CloudFrontWebDistribution(
//       this,
//       "CF-distribution",
//       {
//         originConfigs: [
//           {
//             s3OriginSource: {
//               s3BucketSource: siteBucket,
//               originAccessIdentity: cloudfrontOAI,
//             },
//             behaviors: [
//               {
//                 isDefaultBehavior: true,
//               },
//             ],
//           },
//         ],
//       }
//     );
//     new s3Deploy.BucketDeployment(this, "JSCC-Bucket-Deployment", {
//       sources: [s3Deploy.Source.asset("../dist")],
//       destinationBucket: siteBucket,
//       distribution,
//       distributionPaths: ["/*"],
//     });
//   }
// }
const cdk = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const s3Deploy = require("aws-cdk-lib/aws-s3-deployment");
const iam = require("aws-cdk-lib/aws-iam");
const cloudfront = require("aws-cdk-lib/aws-cloudfront"); // import * as sqs from 'aws-cdk-lib/aws-sqs';
class InfrastructureStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, "JSCC-OAI");
        const siteBucket = new s3.Bucket(this, "ReactShodBucket", {
            bucketName: "react-cloudfront-s3",
            websiteIndexDocument: "index.html",
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        });
        siteBucket.addToResourcePolicy(new iam.PolicyStatement({
            actions: ["S3:GetObject"],
            resources: [siteBucket.arnForObjects("*")],
            principals: [
                new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId),
            ],
        }));
        const distribution = new cloudfront.CloudFrontWebDistribution(this, "JSCC-distribution", {
            originConfigs: [
                {
                    s3OriginSource: {
                        s3BucketSource: siteBucket,
                        originAccessIdentity: cloudfrontOAI,
                    },
                    behaviors: [
                        {
                            isDefaultBehavior: true,
                        },
                    ],
                },
            ],
        });
        new s3Deploy.BucketDeployment(this, "JSCC-Bucket-Deployment", {
            sources: [s3Deploy.Source.asset("../dist")],
            destinationBucket: siteBucket,
            distribution,
            distributionPaths: ["/*"],
        });
        // The code that defines your stack goes here
        // example resource
        // const queue = new sqs.Queue(this, 'CdkQueue', {
        //   visibilityTimeout: cdk.Duration.seconds(300)
        // });
    }
}
exports.InfrastructureStack = InfrastructureStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmFzdHJ1Y3R1cmUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZyYXN0cnVjdHVyZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0NBQXNDO0FBQ3RDLDBDQUEwQztBQUMxQyw0Q0FBNEM7QUFDNUMsOENBQThDO0FBQzlDLDREQUE0RDtBQUM1RCw2REFBNkQ7OztBQUU3RCx1REFBdUQ7QUFDdkQsd0VBQXdFO0FBQ3hFLCtCQUErQjtBQUUvQixpRkFBaUY7QUFFakYsaUVBQWlFO0FBQ2pFLDhDQUE4QztBQUM5Qyw0Q0FBNEM7QUFDNUMsaUNBQWlDO0FBQ2pDLDJEQUEyRDtBQUMzRCxVQUFVO0FBRVYsc0NBQXNDO0FBQ3RDLGtDQUFrQztBQUNsQyxxQ0FBcUM7QUFDckMsc0RBQXNEO0FBQ3RELHdCQUF3QjtBQUN4Qiw0Q0FBNEM7QUFDNUMsNEVBQTRFO0FBQzVFLGVBQWU7QUFDZixhQUFhO0FBQ2IsV0FBVztBQUNYLFNBQVM7QUFFVCxxRUFBcUU7QUFDckUsY0FBYztBQUNkLDJCQUEyQjtBQUMzQixVQUFVO0FBQ1YsMkJBQTJCO0FBQzNCLGNBQWM7QUFDZCxnQ0FBZ0M7QUFDaEMsNENBQTRDO0FBQzVDLHFEQUFxRDtBQUNyRCxpQkFBaUI7QUFDakIsMkJBQTJCO0FBQzNCLGtCQUFrQjtBQUNsQiwyQ0FBMkM7QUFDM0MsbUJBQW1CO0FBQ25CLGlCQUFpQjtBQUNqQixlQUFlO0FBQ2YsYUFBYTtBQUNiLFVBQVU7QUFDVixTQUFTO0FBRVQsc0VBQXNFO0FBQ3RFLHFEQUFxRDtBQUNyRCx1Q0FBdUM7QUFDdkMsc0JBQXNCO0FBQ3RCLG1DQUFtQztBQUNuQyxVQUFVO0FBQ1YsTUFBTTtBQUNOLElBQUk7QUFFSixtQ0FBbUM7QUFFbkMseUNBQXlDO0FBQ3pDLDBEQUEwRDtBQUMxRCwyQ0FBMkM7QUFDM0MseURBQXlELENBQUMsOENBQThDO0FBRXhHLE1BQWEsbUJBQW9CLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDaEQsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QixNQUFNLGFBQWEsR0FBRyxJQUFJLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDNUUsTUFBTSxVQUFVLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUN4RCxVQUFVLEVBQUUscUJBQXFCO1lBQ2pDLG9CQUFvQixFQUFFLFlBQVk7WUFDbEMsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixpQkFBaUIsRUFBRSxFQUFFLENBQUMsaUJBQWlCLENBQUMsU0FBUztTQUNsRCxDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsbUJBQW1CLENBQzVCLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUN0QixPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7WUFDekIsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMxQyxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxHQUFHLENBQUMsc0JBQXNCLENBQzVCLGFBQWEsQ0FBQywrQ0FBK0MsQ0FDOUQ7YUFDRjtTQUNGLENBQUMsQ0FDSCxDQUFDO1FBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSxVQUFVLENBQUMseUJBQXlCLENBQzNELElBQUksRUFDSixtQkFBbUIsRUFDbkI7WUFDRSxhQUFhLEVBQUU7Z0JBQ2I7b0JBQ0UsY0FBYyxFQUFFO3dCQUNkLGNBQWMsRUFBRSxVQUFVO3dCQUMxQixvQkFBb0IsRUFBRSxhQUFhO3FCQUNwQztvQkFDRCxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsaUJBQWlCLEVBQUUsSUFBSTt5QkFDeEI7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGLENBQ0YsQ0FBQztRQUVGLElBQUksUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUM1RCxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQyxpQkFBaUIsRUFBRSxVQUFVO1lBQzdCLFlBQVk7WUFDWixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQztTQUMxQixDQUFDLENBQUM7UUFDSCw2Q0FBNkM7UUFFN0MsbUJBQW1CO1FBQ25CLGtEQUFrRDtRQUNsRCxpREFBaUQ7UUFDakQsTUFBTTtJQUNSLENBQUM7Q0FDRjtBQXhERCxrREF3REMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG4vLyBpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcclxuLy8gaW1wb3J0ICogYXMgczMgZnJvbSBcImF3cy1jZGstbGliL2F3cy1zM1wiO1xyXG4vLyBpbXBvcnQgKiBhcyBpYW0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1pYW1cIjtcclxuLy8gaW1wb3J0ICogYXMgY2xvdWRmcm9udCBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3VkZnJvbnRcIjtcclxuLy8gaW1wb3J0ICogYXMgczNEZXBsb3kgZnJvbSBcImF3cy1jZGstbGliL2F3cy1zMy1kZXBsb3ltZW50XCI7XHJcblxyXG4vLyBleHBvcnQgY2xhc3MgSW5mcmFzdHJ1Y3R1cmVTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XHJcbi8vICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xyXG4vLyAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4vLyAgICAgY29uc3QgY2xvdWRmcm9udE9BSSA9IG5ldyBjbG91ZGZyb250Lk9yaWdpbkFjY2Vzc0lkZW50aXR5KHRoaXMsIFwiQ0YtT0FJXCIpO1xyXG5cclxuLy8gICAgIGNvbnN0IHNpdGVCdWNrZXQgPSBuZXcgczMuQnVja2V0KHRoaXMsIFwiUmVzb3VyY2VCdWNrZXRcIiwge1xyXG4vLyAgICAgICBidWNrZXROYW1lOiBcInNlcnZpbmctc3BhLWJ1Y2tldC1jZGtcIixcclxuLy8gICAgICAgd2Vic2l0ZUluZGV4RG9jdW1lbnQ6IFwiaW5kZXguaHRtbFwiLFxyXG4vLyAgICAgICBwdWJsaWNSZWFkQWNjZXNzOiBmYWxzZSxcclxuLy8gICAgICAgYmxvY2tQdWJsaWNBY2Nlc3M6IHMzLkJsb2NrUHVibGljQWNjZXNzLkJMT0NLX0FMTCxcclxuLy8gICAgIH0pO1xyXG5cclxuLy8gICAgIHNpdGVCdWNrZXQuYWRkVG9SZXNvdXJjZVBvbGljeShcclxuLy8gICAgICAgbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xyXG4vLyAgICAgICAgIGFjdGlvbnM6IFtcIlMzOkdldE9iamVjdFwiXSxcclxuLy8gICAgICAgICByZXNvdXJjZXM6IFtzaXRlQnVja2V0LmFybkZvck9iamVjdHMoXCIqXCIpXSxcclxuLy8gICAgICAgICBwcmluY2lwYWxzOiBbXHJcbi8vICAgICAgICAgICBuZXcgaWFtLkNhbm9uaWNhbFVzZXJQcmluY2lwYWwoXHJcbi8vICAgICAgICAgICAgIGNsb3VkZnJvbnRPQUkuY2xvdWRGcm9udE9yaWdpbkFjY2Vzc0lkZW50aXR5UzNDYW5vbmljYWxVc2VySWRcclxuLy8gICAgICAgICAgICksXHJcbi8vICAgICAgICAgXSxcclxuLy8gICAgICAgfSlcclxuLy8gICAgICk7XHJcblxyXG4vLyAgICAgY29uc3QgZGlzdHJpYnV0aW9uID0gbmV3IGNsb3VkZnJvbnQuQ2xvdWRGcm9udFdlYkRpc3RyaWJ1dGlvbihcclxuLy8gICAgICAgdGhpcyxcclxuLy8gICAgICAgXCJDRi1kaXN0cmlidXRpb25cIixcclxuLy8gICAgICAge1xyXG4vLyAgICAgICAgIG9yaWdpbkNvbmZpZ3M6IFtcclxuLy8gICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgczNPcmlnaW5Tb3VyY2U6IHtcclxuLy8gICAgICAgICAgICAgICBzM0J1Y2tldFNvdXJjZTogc2l0ZUJ1Y2tldCxcclxuLy8gICAgICAgICAgICAgICBvcmlnaW5BY2Nlc3NJZGVudGl0eTogY2xvdWRmcm9udE9BSSxcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgYmVoYXZpb3JzOiBbXHJcbi8vICAgICAgICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICAgICAgaXNEZWZhdWx0QmVoYXZpb3I6IHRydWUsXHJcbi8vICAgICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgXSxcclxuLy8gICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgXSxcclxuLy8gICAgICAgfVxyXG4vLyAgICAgKTtcclxuXHJcbi8vICAgICBuZXcgczNEZXBsb3kuQnVja2V0RGVwbG95bWVudCh0aGlzLCBcIkpTQ0MtQnVja2V0LURlcGxveW1lbnRcIiwge1xyXG4vLyAgICAgICBzb3VyY2VzOiBbczNEZXBsb3kuU291cmNlLmFzc2V0KFwiLi4vZGlzdFwiKV0sXHJcbi8vICAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiBzaXRlQnVja2V0LFxyXG4vLyAgICAgICBkaXN0cmlidXRpb24sXHJcbi8vICAgICAgIGRpc3RyaWJ1dGlvblBhdGhzOiBbXCIvKlwiXSxcclxuLy8gICAgIH0pO1xyXG4vLyAgIH1cclxuLy8gfVxyXG5cclxuaW1wb3J0ICogYXMgY2RrIGZyb20gXCJhd3MtY2RrLWxpYlwiO1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xyXG5pbXBvcnQgKiBhcyBzMyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXMzXCI7XHJcbmltcG9ydCAqIGFzIHMzRGVwbG95IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtczMtZGVwbG95bWVudFwiO1xyXG5pbXBvcnQgKiBhcyBpYW0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1pYW1cIjtcclxuaW1wb3J0ICogYXMgY2xvdWRmcm9udCBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3VkZnJvbnRcIjsgLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEluZnJhc3RydWN0dXJlU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xyXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG4gICAgY29uc3QgY2xvdWRmcm9udE9BSSA9IG5ldyBjbG91ZGZyb250Lk9yaWdpbkFjY2Vzc0lkZW50aXR5KHRoaXMsIFwiSlNDQy1PQUlcIik7XHJcbiAgICBjb25zdCBzaXRlQnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLCBcIlJlYWN0U2hvZEJ1Y2tldFwiLCB7XHJcbiAgICAgIGJ1Y2tldE5hbWU6IFwicmVhY3QtY2xvdWRmcm9udC1zM1wiLFxyXG4gICAgICB3ZWJzaXRlSW5kZXhEb2N1bWVudDogXCJpbmRleC5odG1sXCIsXHJcbiAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IGZhbHNlLFxyXG4gICAgICBibG9ja1B1YmxpY0FjY2VzczogczMuQmxvY2tQdWJsaWNBY2Nlc3MuQkxPQ0tfQUxMLFxyXG4gICAgfSk7XHJcblxyXG4gICAgc2l0ZUJ1Y2tldC5hZGRUb1Jlc291cmNlUG9saWN5KFxyXG4gICAgICBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XHJcbiAgICAgICAgYWN0aW9uczogW1wiUzM6R2V0T2JqZWN0XCJdLFxyXG4gICAgICAgIHJlc291cmNlczogW3NpdGVCdWNrZXQuYXJuRm9yT2JqZWN0cyhcIipcIildLFxyXG4gICAgICAgIHByaW5jaXBhbHM6IFtcclxuICAgICAgICAgIG5ldyBpYW0uQ2Fub25pY2FsVXNlclByaW5jaXBhbChcclxuICAgICAgICAgICAgY2xvdWRmcm9udE9BSS5jbG91ZEZyb250T3JpZ2luQWNjZXNzSWRlbnRpdHlTM0Nhbm9uaWNhbFVzZXJJZFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICBdLFxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zdCBkaXN0cmlidXRpb24gPSBuZXcgY2xvdWRmcm9udC5DbG91ZEZyb250V2ViRGlzdHJpYnV0aW9uKFxyXG4gICAgICB0aGlzLFxyXG4gICAgICBcIkpTQ0MtZGlzdHJpYnV0aW9uXCIsXHJcbiAgICAgIHtcclxuICAgICAgICBvcmlnaW5Db25maWdzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHMzT3JpZ2luU291cmNlOiB7XHJcbiAgICAgICAgICAgICAgczNCdWNrZXRTb3VyY2U6IHNpdGVCdWNrZXQsXHJcbiAgICAgICAgICAgICAgb3JpZ2luQWNjZXNzSWRlbnRpdHk6IGNsb3VkZnJvbnRPQUksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJlaGF2aW9yczogW1xyXG4gICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlzRGVmYXVsdEJlaGF2aW9yOiB0cnVlLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgbmV3IHMzRGVwbG95LkJ1Y2tldERlcGxveW1lbnQodGhpcywgXCJKU0NDLUJ1Y2tldC1EZXBsb3ltZW50XCIsIHtcclxuICAgICAgc291cmNlczogW3MzRGVwbG95LlNvdXJjZS5hc3NldChcIi4uL2Rpc3RcIildLFxyXG4gICAgICBkZXN0aW5hdGlvbkJ1Y2tldDogc2l0ZUJ1Y2tldCxcclxuICAgICAgZGlzdHJpYnV0aW9uLFxyXG4gICAgICBkaXN0cmlidXRpb25QYXRoczogW1wiLypcIl0sXHJcbiAgICB9KTtcclxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxyXG5cclxuICAgIC8vIGV4YW1wbGUgcmVzb3VyY2VcclxuICAgIC8vIGNvbnN0IHF1ZXVlID0gbmV3IHNxcy5RdWV1ZSh0aGlzLCAnQ2RrUXVldWUnLCB7XHJcbiAgICAvLyAgIHZpc2liaWxpdHlUaW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMDApXHJcbiAgICAvLyB9KTtcclxuICB9XHJcbn1cclxuIl19