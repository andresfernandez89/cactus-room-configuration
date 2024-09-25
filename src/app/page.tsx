import RoomConfigurator from "./components/RoomConfigurator";

//import { getMaterials } from "@/firebase/firestore";

const Home: React.FC = () => {
  //getMaterials("Ks5CthbPwAvd2TNxzHEl").then((m) => console.log(m));

  return (
    <main className="flex justify-center mt-2 md:items-center min-h-screen px-1 md:px-4">
      <RoomConfigurator />
    </main>
  );
};

export default Home;
