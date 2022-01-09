import { useCallback, useEffect, useState } from 'react';

const useAsync = (asyncFunction, shouldRun) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  const run = useCallback(() => {
    setResult(null);
    setError(null);
    setStatus('pending');

    return asyncFunction()
      .then((response) => {
        setStatus('settled');
        setResult(response);
      })
      .catch((error) => {
        setStatus('error');
        setError(error);
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (shouldRun) {
      run();
    }
  }, [run, shouldRun]);

  return [run, result, error, status];
};

const fetchData = async () => {
  let data = await fetch('https://jsonplaceholder.typicode.com/posts');
  let json = await data.json();
  return json;
};

const Home = () => {
  const [reFetchData, result, error, status] = useAsync(fetchData, true);

  // useEffect(() => {
  //   reFetchData();
  // }, [reFetchData]);

  return <p>{JSON.stringify(result)}</p>;
};

export default Home;
