import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';

interface CodeRepositoryStackProps extends StackProps {
    stackName?: string,
    repositoryName?: string
    sourceCodePath?: string
}

// Stack to setup CodeCommit repository
export class CodeRepositoryStack extends Stack {
    public readonly repository: codecommit.IRepository;
    constructor(scope: Construct, id: string, props?: CodeRepositoryStackProps) {
      super(scope, id, props);
  
        // New Repository and pushing code from source directory
        this.repository = new codecommit.Repository(this, `${props?.stackName}-repository`, {
            repositoryName: props?.repositoryName || 'code-repository',
            code: codecommit.Code.fromDirectory(`${props?.sourceCodePath}`, 'main')
        });
    }
}
          
        