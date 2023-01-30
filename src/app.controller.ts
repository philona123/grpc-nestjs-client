import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Address, Person, AppControllerClient as IAppController } from './app';
import { options } from './grpc.options';

@Controller()
export class AppController implements OnModuleInit {
  @Client(options)
  private client: ClientGrpc;
  private grpcService: IAppController;

  onModuleInit() {
    this.grpcService = this.client.getService<IAppController>('AppController');
  }

  @Post('add')
  async accumulate(
    @Body('person') person: Person,
    @Body('address') address: Address,
  ) {
    const x = await lastValueFrom(
      this.grpcService.accumulate({ person, address }),
    );
    return { details: x };
  }
}
