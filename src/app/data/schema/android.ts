export interface IReleaseBase {
  versionName: string;
  versionCode: number;
  body: string;
  apkUrl: string;
}

export interface IRelease extends IReleaseBase {
  createdAt: string;
  updatedAt: string;
}

export interface IGHContent {
  name: string;
  path: string;
  content: string;
  encoding: 'base64';
}

export interface IGradleFile {
  apply: string[];
  android: {
      compileSdkVersion: string;
      defaultConfig: {
          applicationId: string;
          minSdkVersion: string;
          targetSdkVersion: string;
          versionCode: string;
          versionName: string;
      }
  };
}

export interface IGhRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  draft: boolean;
  created_at: string;
  published_at: string;
}
