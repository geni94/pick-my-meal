import { type NextPage } from "next";
import { api } from "~/utils/api";

const UserProfileSlug: NextPage = () => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username: 'test',
  });

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>404!</div>
  return (
    <main className="flex min-h-screen overflow-y-auto flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      {data.username}
    </main>
  );
};

export default UserProfileSlug;
