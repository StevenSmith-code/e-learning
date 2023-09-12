import { useUser } from "@/context/UserContext";

function Dashboard() {
  const { user, setUser } = useUser();
  return (
    <>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        {user?.enrollments.length === 0
          ? `Welcome ${user?.username}! looks like you have not got any courses, check out the browse page!`
          : `Welcome ${user?.username}! let's get to learning!`}
      </h2>
    </>
  );
}

export default Dashboard;
