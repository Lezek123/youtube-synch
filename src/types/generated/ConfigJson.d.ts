/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Configuration schema for Youtube synch service node
 */
export interface YoutubeSyncNodeConfiguration {
  /**
   * Joystream network related configuration
   */
  joystream: {
    /**
     * Joystream's faucet configuration (needed for captcha-free membership creation)
     */
    faucet: {
      /**
       * Joystream's faucet URL
       */
      endpoint: string
      /**
       * Bearer Authentication Key needed to bypass captcha verification on Faucet
       */
      captchaBypassKey: string
    }
    /**
     * Joystream Metaprotocol App specific configuration
     */
    app: {
      /**
       * Name of the app
       */
      name: string
      /**
       * Specifies the app auth key's string seed, for generating ed25519 keypair, to be used for signing App Actions
       */
      accountSeed: string
    }
    channelCollaborator: JoystreamChannelCollaboratorUsedForSyncingTheContent
  }
  /**
   * Specifies external endpoints that the distributor node will connect to
   */
  endpoints: {
    /**
     * Query node graphql server uri (for example: http://localhost:8081/graphql)
     */
    queryNode: string
    /**
     * Joystream node websocket api uri (for example: ws://localhost:9944)
     */
    joystreamNodeWs: string
    /**
     * Redis server host and port, required by BullMQ
     */
    redis: {
      host: string
      port: number
    }
  }
  /**
   * Specifies the logging configuration
   */
  logs?: {
    file?: FileLoggingOptions
    console?: ConsoleLoggingOptions
    elastic?: ElasticsearchLoggingOptions
  }
  youtube: YoutubeOauth2ClientConfiguration
  aws?: AWSConfigurationsNeededToConnectWithDynamoDBInstance
  proxy?: Socks5ProxyClientConfigurationUsedByYtDlpToBypassIPBlockageByYoutube
  /**
   * Specifies creator onboarding (signup) requirements for Youtube Partner Program
   */
  creatorOnboardingRequirements: {
    /**
     * Minimum number of subscribers required for signup
     */
    minimumSubscribersCount: number
    /**
     * Minimum total number of videos required for signup
     */
    minimumVideosCount: number
    /**
     * Minimum age of videos in hours for signup
     */
    minimumVideoAgeHours: number
    /**
     * Minimum age of the channel in hours for signup
     */
    minimumChannelAgeHours: number
    /**
     * Minimum number of videos posted per month
     */
    minimumVideosPerMonth: number
    /**
     * Number of latest months to consider for the monthly video posting requirement
     */
    monthsToConsider: number
  }
  httpApi: PublicApiConfiguration
  sync: YTSynchSyncronizationRelatedSettings
}
/**
 * Joystream channel collaborators used for syncing the content
 */
export interface JoystreamChannelCollaboratorUsedForSyncingTheContent {
  memberId: string
  /**
   * Specifies the available application auth keys.
   *
   * @minItems 1
   */
  account: (SubstrateUri | MnemonicPhrase)[]
}
/**
 * Keypair's substrate uri (for example: //Alice)
 */
export interface SubstrateUri {
  type?: 'ed25519'
  suri: string
}
/**
 * Mnemonic phrase
 */
export interface MnemonicPhrase {
  type?: 'ed25519' | 'sr25519' | 'ecdsa'
  mnemonic: string
}
export interface FileLoggingOptions {
  /**
   * Minimum level of logs sent to this output
   */
  level: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'
  /**
   * Path where the logs will be stored (absolute or relative to config file)
   */
  path: string
  /**
   * Maximum number of log files to store. Recommended to be at least 7 when frequency is set to `daily` and at least 24 * 7 when frequency is set to `hourly`
   */
  maxFiles?: number
  /**
   * Maximum size of a single log file in bytes
   */
  maxSize?: number
  /**
   * The frequency of creating new log files (regardless of maxSize)
   */
  frequency?: 'yearly' | 'monthly' | 'daily' | 'hourly'
  /**
   * Whether to archive old logs
   */
  archive?: boolean
}
export interface ConsoleLoggingOptions {
  /**
   * Minimum level of logs sent to this output
   */
  level: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'
}
export interface ElasticsearchLoggingOptions {
  /**
   * Minimum level of logs sent to this output
   */
  level: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'
  /**
   * Elasticsearch endpoint to push the logs to (for example: http://localhost:9200)
   */
  endpoint: string
  auth: ElasticsearchAuthenticationOptions
}
export interface ElasticsearchAuthenticationOptions {
  /**
   * Elasticsearch username
   */
  username: string
  /**
   * Elasticsearch password
   */
  password: string
}
/**
 * Youtube Oauth2 Client configuration
 */
export interface YoutubeOauth2ClientConfiguration {
  /**
   * Youtube Oauth2 Client Id
   */
  clientId: string
  /**
   * Youtube Oauth2 Client Secret
   */
  clientSecret: string
  /**
   * Maximum percentage of daily Youtube API quota that can be used by the Periodic polling service. Once this limit is reached the service will stop polling for new videos until the next day(when Quota resets). All the remaining quota (100 - maxAllowedQuotaUsageInPercentage) will be used for potential channel's signups.
   */
  maxAllowedQuotaUsageInPercentage?: number
  /**
   * Path to the Google Cloud's Application Default Credentials (ADC) key file. It is required to periodically monitor the Youtube API quota usage.
   */
  adcKeyFilePath?: string
}
/**
 * AWS configurations needed to connect with DynamoDB instance
 */
export interface AWSConfigurationsNeededToConnectWithDynamoDBInstance {
  /**
   * DynamoDB endpoint to connect with the instance, only set if node is connecting to local DynamoDB instance
   */
  endpoint?: string
  /**
   * DynamoDB endpoint to connect with the instance, only set if node is connecting to AWS DynamoDB instance
   */
  region?: string
  credentials?: AWSCredentials
}
/**
 * Youtube Oauth2 Client configuration
 */
export interface AWSCredentials {
  accessKeyId: string
  secretAccessKey: string
}
/**
 * Socks5 proxy client configuration used by yt-dlp to bypass IP blockage by Youtube
 */
export interface Socks5ProxyClientConfigurationUsedByYtDlpToBypassIPBlockageByYoutube {
  /**
   * List of available socks5 proxy URLs
   *
   * @minItems 1
   */
  urls?: string[]
}
/**
 * Public api configuration
 */
export interface PublicApiConfiguration {
  port: number
  ownerKey: string
  disableNewSignUps?: boolean
}
/**
 * YT-synch's syncronization related settings
 */
export interface YTSynchSyncronizationRelatedSettings {
  /**
   * Option to enable/disable syncing while starting the service
   */
  enable: boolean
  /**
   * Path to a directory where all the downloaded assets will be stored
   */
  downloadsDir?: string
  /**
   * Specifies how often periodic tasks (for example youtube state polling) are executed.
   */
  intervals?: {
    /**
     * After how many minutes, the polling service should poll the Youtube api for channels state update
     */
    youtubePolling: number
    /**
     * After how many minutes, the service should scan the database for new content to start downloading, on-chain creation & uploading to storage node
     */
    contentProcessing: number
  }
  /**
   * Specifies youtube-synch service limits.
   */
  limits?: {
    dailyApiQuota: SpecifiesDailyYoutubeAPIQuotaRationingSchemeForYoutubePartnerProgram
    /**
     * Max no. of videos that should be concurrently downloaded from Youtube to be prepared for upload to Joystream
     */
    maxConcurrentDownloads: number
    /**
     * No. of videos that should be created in a batched 'create_video' tx
     */
    createVideoTxBatchSize: number
    /**
     * Max no. of videos that should be concurrently uploaded to Joystream's storage node
     */
    maxConcurrentUploads: number
    /**
     * Timeout for pending youtube video downloads in seconds
     */
    pendingDownloadTimeoutSec: number
    /**
     * Maximum total size of all downloaded assets stored in `downloadsDir`
     */
    storage: string
    /**
     * Maxiumum size of a single video (in MB)
     */
    maxVideoSizeMB?: number
    /**
     * Maximum duration of a single video in seconds
     */
    maxVideoDuration?: number
    /**
     * Specifies the time to sleep before each download is started
     */
    preDownloadSleep?: {
      /**
       * Minimum value to sleep (in miliseconds)
       */
      min: number
      /**
       * Maximum value to sleep (in miliseconds)
       */
      max: number
    }
  }
}
/**
 * Specifies daily Youtube API quota rationing scheme for Youtube Partner Program
 */
export interface SpecifiesDailyYoutubeAPIQuotaRationingSchemeForYoutubePartnerProgram {
  sync: number
  signup: number
}
