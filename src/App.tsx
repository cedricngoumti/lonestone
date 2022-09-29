import React, { useState, useEffect } from "react";
import apihost from "./services/apihost";
import Controller from "./services/controller";
import { Product } from "./models/Product";
import Spinner from "./components/ui/Spinner";
import Logo from "./assets/Logo";


const App = () => {
  const [product, setProduct]: [Product[], (data: Product[]) => void] =
    useState<Product[]>([]);

  const [isLoading, setIsloading]: [boolean, (isload: boolean) => void] =
    useState<boolean>(false);

  useEffect(() => {
    Controller<any>("products")
      .getAll()
      .then((e) => console.log(e));
    fetch(`${apihost}products`).then((e) => console.log(e));
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-medium underline">
      Hello world!
    </h1>
      <Logo/>
    </div>
  );
};

export default App;
