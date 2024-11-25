import { useGetUsers } from "@/api/users/useGetUsers";
import { User } from "@/types/User";
import { ChangeEvent, useEffect, useState } from "react";
import Input from "@/components/common/Input.tsx";
import { PaginateParams } from "@/types/Paginate.ts";
import LoadingSection from "@/components/LoadingSection.tsx";
import useDebounce from "@/hooks/useDebounce.ts";
import UserTable from "@/components/common/tables/UserTable.tsx";

export default function UserManagementLayout() {
  const [filterState, setFilterState] = useState<PaginateParams>({
    pageNo: 0,
    pageSize: 10,
  });

  const { loading, data } = useGetUsers(filterState);
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(
    data?.content || []
  );
  useEffect(() => {
    if (data?.content) {
      const filtered = debounceSearch
        ? data?.content.filter(
            (user) =>
              user?.fullName.toLowerCase().includes(search.toLowerCase()) ||
              user?.email.toLowerCase().includes(search.toLowerCase())
          )
        : data?.content;
      setFilteredUsers(filtered);
    }
  }, [data]);
  /**
   * When the equipment is deleted, the equipments table will be updated causing it to rerender
   * @param equipment
   */
  function deleteUser(user: User) {
    setFilteredUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
  }

  /**
   * When the equipment is updated, the equipments table will be updated causing it to rerender
   * @param equipment
   */
  function updateUser(updatedUser: User) {
    setFilteredUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearch(value);
  }

  return (
    <div className="w-full h-full">
      <div className="py-4 bg-gray-100 rounded-xl w-full h-full">
        <div className="w-full px-4">
          <div className="w-full justify-between flex items-center py-3">
            <h1 className="text-sm md:text-2xl sm:text-md font-semibold">
              Users
            </h1>
          </div>
          <div className="w-full justify-between flex items-center">
            <Input placeholder="Search ..." onChange={handleSearch} />
            <div className={"flex gap-5 items-center"}>
              <select
                defaultValue={filterState.pageNo}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilterState({
                    ...filterState,
                    pageSize: Number(e.target.value),
                  })
                }
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option disabled selected>
                  Page {Number(filterState?.pageNo) + 1}
                </option>
                {Array.from(Array(data?.totalPages).keys()).map(
                  (pageNo, key) => (
                    <option key={key} value={pageNo}>
                      {pageNo + 1}
                    </option>
                  )
                )}
              </select>

              <select
                defaultValue={filterState.pageSize}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilterState({
                    ...filterState,
                    pageSize: Number(e.target.value),
                  })
                }
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option disabled selected>
                  Limit {filterState.pageSize}
                </option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
        {loading ? (
          <LoadingSection />
        ) : (
          <UserTable
            onDelete={deleteUser}
            onUpdate={updateUser}
            users={filteredUsers}
          />
        )}
      </div>
    </div>
  );
}
