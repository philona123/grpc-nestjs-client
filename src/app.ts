/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "app";

export interface Person {
  name: string;
  age: number;
}

export interface Address {
  street: string;
  state: string;
}

export interface Details {
  person: Person | undefined;
  address: Address | undefined;
}

export interface AccumulateInput {
  person: Person | undefined;
  address: Address | undefined;
}

export const APP_PACKAGE_NAME = "app";

export interface AppControllerClient {
  accumulate(request: AccumulateInput): Observable<Details>;
}

export interface AppControllerController {
  accumulate(request: AccumulateInput): Observable<Details>;
}

export function AppControllerControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["accumulate"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AppController", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AppController", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const APP_CONTROLLER_SERVICE_NAME = "AppController";
