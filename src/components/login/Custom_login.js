import React from "react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import Cookies from "js-cookie";

const Custom_login = () => {
  // let navigate = useNavigate();
  // const queryClient = useQueryClient();
  // const params = useParams();
  // // add state for login
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // Queries the API to create a new survey.

  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            <h1>Login</h1>
            <form>
              <input
                className="border-solid border-b-2 border-black hover:border-t-4"
                placeholder="name"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom_login;
