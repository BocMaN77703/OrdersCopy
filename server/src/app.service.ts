import { Injectable } from '@nestjs/common'
import { DatabaseService } from './modules/database/database.service'

@Injectable()
export class AppService {
    constructor(private readonly db: DatabaseService) {}
    async getAllProducts() {
        const products = await this.db.product.findMany()
        return products
    }
}
