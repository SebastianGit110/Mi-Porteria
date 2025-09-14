export interface IHouseF {
  id: string;
  house_num: number | undefined;
  isStore: boolean | undefined;
  block: number | undefined;
  actions?: any;
}

export interface IResidentF {
  id: string;
  house_num: number;
  name: string | undefined;
  last_name: string | undefined;
  phone: number | undefined;
  mail: string | undefined;
  resident_type: string | undefined; //"propietario" | "arrendatario" | "residente";
  actions?: any;
}

export interface ICorrespondenciaF {
  id: string;
  house_num: number;
  state: "entregada" | "pendiente";
  receipt_date: string; // Si causa errores cambiar por date
  delivery_date: string;
  type: string;
  photo: string;
  description: string;
}

export interface IVisitantesF {
  id: string;
  house_num: number | null;
  name: string | null;
  state: { entered: Date | null | string; left: Date | null | string };
  vehicle: {
    type: "Carro" | "Moto" | null;
    color: string | null;
    license: string | null;
  } | null;
  photo: string | null;
  description: string | null;
}

export interface IDomiciliosF {
  id: string;
  house_num: number;
  authorizes: string;
  state: { entered: string; left: string };
  description: string;
}

export interface IControl_Vehicular {
  id: string;
  vehicle: { type: string; license: string };
  color: string;
  house_num: number;
  last_activity: { status: "ingresó" | "salío"; date: string };
}

export interface IMinutaF {
  id: string;
  date: string;
  guard: string;
  description: string;
}

export interface IParqueaderoF {
  id: string;
  house_num: number | undefined;
  type: "Carro" | "Moto" | null;
  license: string | undefined;
  state: boolean | string | undefined;
  actions?: any;
}
