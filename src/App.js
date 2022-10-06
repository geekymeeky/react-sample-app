import { useState, useEffect } from "react";
import Loader from "./components/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleFetch = () => {
    setIsLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("https://demo2211087.mockable.io/mock", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setData(data?.companies);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };
  // with cleanup
  useEffect(() => {
    handleFetch();

    return () => {
      setData([]);
      setError(null);
    };
  }, []);

  return (
    <div className="md:container md:mx-auto">
      <div className="sm:px-6 w-full">
        <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Companies
            </p>
          </div>
        </div>
        <div className="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
          <div className="sm:flex items-center justify-between">
            <div className="flex items-center"></div>
            <button
              className="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
              onClick={handleFetch}
            >
              <p className="text-sm font-medium leading-none text-white">
                Refresh
              </p>
            </button>
          </div>

          <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              {isLoading ? (
                <Loader />
              ) : !error ? (
                <tbody>
                  {data?.map((company, index) => {
                    return (
                      <tr
                        className="h-16 border border-gray-100 rounded"
                        key={company.name}
                      >
                        <td>
                          <div className="ml-5">
                            <div className="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                              <input
                                type="checkbox"
                                className="checkbox cursor-pointer w-full h-full"
                                value={company.name}
                              />
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="flex items-center pl-5">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">
                              {company.name}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center pl-5">
                            <p className="text-base font-medium leading-none text-gray-700 mr-2">
                              {company.email}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center pl-5">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 uppercase">
                              {company.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <p className="text-base font-medium leading-none text-gray-700 mr-2">
                  {error}
                </p>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
