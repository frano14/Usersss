import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(5);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [showed, setShowed] = useState(false);
  const [search, setSearch] = useState("");
  const [sorted, setSorted] = useState(false);

  useGSAP(() => {
    gsap.to("#line", {
      x: screenWidth - 300,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, [loading]);

  const restart = () => {
    setShowed(false);
    setLoading(false);
  };

  const countIncrement = () => {
    setCount(count + 5);
  };

  const showUsers = () => {
    setLoading(true);
    const fetchPosts = async () => {
      fetch("https://randomuser.me/api/?results=100")
        .then((res) => res.json())
        .then((fetchedusers) => {
          setUsers(fetchedusers.results);
          setLoading(false);
          setShowed(true);
        });
    };
    fetchPosts();
  };

  const sortByName = () => {
    const usersCopy = [...users];
    usersCopy.sort((userA, userB) => {
      if (sorted) {
        return userB.name.first.localeCompare(userA.name.first);
      } else {
        return userA.name.first.localeCompare(userB.name.first);
      }
    });
    setUsers(usersCopy);
    setSorted(!sorted);
  };

  const sortByAge = () => {
    const usersCopy = [...users];
    usersCopy.sort((userA, userB) => {
      if (sorted.reversed) {
        return userB.dob.age - userA.dob.age;
      } else {
        return userA.dob.age - userB.dob.age;
      }
    });
    setUsers(usersCopy);
    setSorted({ reversed: !sorted.reversed });
  };

  return (
    <>
      <div className="bg-zinc-200 h-full">
        <header className="bg-black flex justify-center items-center text-white m-auto py-4">
          <nav className="w-[1200px] flex justify-between items-center">
            <p
              className="text-3xl font-medium cursor-pointer"
              onClick={restart}
            >
              Usersss.
            </p>
            <div className="flex gap-4">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                placeholder="Search..."
                className=" rounded-lg px-4 py-2 text-black"
              />
              <button
                className="rounded-lg px-8 py-2 text-white border"
                onClick={showUsers}
              >
                Show
              </button>
            </div>
          </nav>
        </header>
        {loading ? (
          <div className="w-full h-2 bg-black">
            <div id="line" className="w-[300px] h-full bg-white"></div>
            {loading}
          </div>
        ) : null}
      </div>
      {showed ? (
        <section className="w-[1200px] mt-[100px] pb-[100px] m-auto">
          <>
            <div className="flex gap-4">
              <button
                className="px-8 py-2 bg-white rounded-lg text-2xl border-full mt-[100px] mb-[20px]"
                onClick={sortByName}
              >
                {sorted ? <p>Sort from Z-A</p> : <p>Sort from A-Z</p>}
              </button>
              <button
                className="px-8 py-2 bg-white rounded-lg text-2xl border-full mt-[100px] mb-[20px]"
                onClick={sortByAge}
              >
                Sort by age
              </button>
            </div>
            <div className=" py-4 pl-5 bg-white text-3xl font-medium rounded-t-[20px]">
              User list
            </div>
            <table className="w-full">
              <thead className="w-full">
                <tr className="border-full">
                  <td className="py-2 pl-5 text-gray-500 font-light text-xl">
                    First Name
                  </td>
                  <td className="py-2 pl-5 text-gray-500 font-light text-xl">
                    Last Name
                  </td>
                  <td className="py-2 pl-5 text-gray-500 font-light text-xl">
                    Age
                  </td>
                  <td className="py-2 pl-5 text-gray-500 font-light text-xl">
                    Nationality
                  </td>
                  <td className="py-2 pl-5 text-gray-500 font-light text-xl">
                    Phone
                  </td>
                  <td className="py-2 pl-5 text-gray-500 font-light text-xl">
                    Address
                  </td>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((user) => {
                    return search.toLowerCase() === ""
                      ? user
                      : user.name.first.toLowerCase().includes(search);
                  })
                  .map((user, index) => {
                    return index < count ? (
                      <tr key={index} className="border-top-bottom">
                        <td className=" py-4 pl-5 bg-white">
                          {user.name.first}
                        </td>
                        <td className=" py-4 pl-5 bg-white">
                          {user.name.last}
                        </td>
                        <td className=" py-4 pl-5 bg-white">{user.dob.age}</td>
                        <td className=" py-4 pl-5 bg-white">{user.nat}</td>
                        <td className=" py-4 pl-5 bg-white">{user.phone}</td>
                        <td className=" py-4 pl-5 bg-white">
                          {user.location.city}, {user.location.street.name}{" "}
                          {user.location.street.name}
                        </td>
                      </tr>
                    ) : null;
                  })}
              </tbody>
            </table>
            <div className=" py-4 pl-5 bg-white text-lg font-normal rounded-b-[20px] text-black flex justify-center items-center...">
              <p className=" cursor-pointer" onClick={countIncrement}>
                {" "}
                show more...
              </p>
            </div>
          </>
        </section>
      ) : (
        <p className="text-[180px] font-light text-center mt-[100px] text-zinc-300">
          SHOW USERS
        </p>
      )}
    </>
  );
}

export default App;
