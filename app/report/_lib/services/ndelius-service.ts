// class BlogMD {
//     private static instance: BlogMD;

import HmppsAuthClient from "../../../../server/data/hmppsAuthClient";
import { createRedisClient } from "../../../../server/data/redisClient";
import TokenStore from "../../../../server/data/tokenStore";
import PreSentenceToDeliusService from "../../../../server/services/preSentenceToDeliusService";

  
//     private constructor(directory: string) {
//       this.directoryManager = path.join(process.cwd(), directory);
//     }
  
//     static getInstance(directory: string): BlogMD {
//       // Only create new instance if one doesn't already exist
//       if (!this.instance) {
//         this.instance = new BlogMD(directory);
//       }
//     }
  
//     static getInstance(directory: string): BlogMD {
//       // Only create new instance if one doesn't already exist
//       if (!this.instance) {
//         this.instance = new BlogMD(directory);
//       }
  
//       // Return the existing instance if one exists
//       // or the new instance if one doesn't exist
//       return this.instance;
//     }
  
//     // Other Methods...
//   }

export default class NdeliusService {
  private static instance: PreSentenceToDeliusService

  static getInstance(): PreSentenceToDeliusService {
    if (this.instance) {
      return this.instance
    }

    const hmppsAuthClient = new HmppsAuthClient(new TokenStore(createRedisClient({ legacyMode: false })))
    const ndeliusService = new PreSentenceToDeliusService(hmppsAuthClient)

    return ndeliusService
  }
}