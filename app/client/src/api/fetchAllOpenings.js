// The fetchData function is now exported and can be imported in other components
export const fetchAllOpenings = async (username, setAllOpenings) => {

  try {
        const response = await fetch(`http://127.0.0.1:5000/all_openings?username=${username}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAllOpenings(data);
        console.log(data);
  } catch (error) {
        console.error("Error fetching data:", error);
        // TODO: Handle errors
  }
};
