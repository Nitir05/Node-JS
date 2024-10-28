import "./App.css";
import { useQuery, gql } from "@apollo/client";

const query = gql`
    query GetTodos {
        getTodos {
            id
            title
            completed
        }
    }
`;

function App() {
    const { data, loading } = useQuery(query);
    return (
        <div className="App">
            {loading && <h1>Loadin...</h1>}
            <div>{data && JSON.stringify(data)}</div>
        </div>
    );
}

export default App;
