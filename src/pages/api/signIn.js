import axiosInstance from "../../network/api";

// export default async function handler(req, res) {
//     try {
//         // Make an API request here and retrieve the data

//         const param1 = 'value1';
//         const param2 = 'value2';

//         console.log(param1, param2, "sdajndiwqdnjkad")
//         axiosInstance.post("/api/fetchData?param1=${param1}&param2=${param2}")
//             .then((response) => console.log(response))
//             .catch((error) => console.log(error));


//         // res.status(200).json({ data });
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching data' });
//     }
// }



import { onLogin } from "../../network/actions/login";
import { useDispatch } from "react-redux";

export default async function handler(req, res) {
    try {

        console.log("asnkjdasjdkqwd")
        // const data = useDispatch(onLogin()); // Call your Axios API function

        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
}


