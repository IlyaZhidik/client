import type { Players } from "feathers-api";
import {ServiceInstance} from "feathers-pinia";

declare global {

    type Instance<T> = ServiceInstance<T, T>


    type IPlayer = Players
}
