import { AuthService } from './auth.service';
import { BikeService } from './bike.service';

export const services: any[] = [AuthService, BikeService];

export * from './bike.service';
export * from './auth.service';

