import RoomConfigurator from "./components/RoomConfigurator";

const Home: React.FC = () => {
  return (
    <main className="flex justify-center mt-2 md:items-center min-h-screen px-1 md:px-4">
      <RoomConfigurator />
    </main>
  );
};

export default Home;
