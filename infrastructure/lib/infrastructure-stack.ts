import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as iam from "aws-cdk-lib/aws-iam";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as s3Deploy from "aws-cdk-lib/aws-s3-deployment";

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, "CF-OAI");

    const siteBucket = new s3.Bucket(this, "ResourceBucket", {
      bucketName: "serving-spa-bucket-cdk",
      websiteIndexDocument: "index.html",
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    siteBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ["S3:GetObject"],
        resources: [siteBucket.arnForObjects("*")],
        principals: [
          new iam.CanonicalUserPrincipal(
            cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
          ),
        ],
      })
    );

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "CF-distribution",
      {
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
      }
    );

    new s3Deploy.BucketDeployment(this, "JSCC-Bucket-Deployment", {
      sources: [s3Deploy.Source.asset("../dist")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new cdk.CfnOutput(this, "CloudFrontURL", {
      value: distribution.distributionDomainName,
      description: "The distribution URL",
      exportName: "CloudfrontURL",
    });

    new cdk.CfnOutput(this, "BucketName", {
      value: siteBucket.bucketName,
      description: "The name of the S3 bucket",
      exportName: "BucketName",
    });
  }
}