import Input from "../components/common/Input";
import TransactionTable from "../components/common/tables/TransactionTable";
import LoadingCircle from "../components/common/LoadingCircle";
import useDebounce from "@/hooks/useDebounce";
import useGetAllTransactions, {
  FilterType,
} from "@/api/transactions/useGetAllTransactions";
import { ChangeEvent, useEffect, useState } from "react";
import { Transaction } from "@/types/Transactions";

export default function TransactionLayout() {
  const { loading, data } = useGetAllTransactions();
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const debounceSearch = useDebounce(search);

  useEffect(() => {
    if (!data) return;

    // Search filtering
    const searchFiltered = debounceSearch
      ? data.filter(
          (transaction) =>
            transaction?.equipment?.name
              .toLowerCase()
              .includes(debounceSearch.toLowerCase()) ||
            transaction?.user?.fullName
              .toLowerCase()
              .includes(debounceSearch.toLowerCase())
        )
      : data;

    // Apply selected filter
    const finalFiltered = handleFilter(filter, searchFiltered);
    setFilteredTransactions(finalFiltered);
  }, [data, debounceSearch, filter]);

  function handleFilter(
    filter: FilterType,
    transactions: Transaction[]
  ): Transaction[] {
    switch (filter) {
      case "pending":
        return transactions.filter(
          (transaction) =>
            transaction.returnedAt === null &&
            !transaction.approved &&
            transaction.conditionImage !== null
        );
      case "approved":
        return transactions.filter(
          (transaction) =>
            transaction.approved && transaction.returnedAt !== null
        );
      case "returned":
        return transactions.filter(
          (transaction) => transaction.returnedAt !== null
        );
      case "ongoing":
        return transactions.filter(
          (transaction) => transaction.returnedAt === null
        );
      case "all":
      default:
        return transactions;
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  return (
    <div className="w-full h-full">
      <div className="py-4 bg-gray-100 rounded-xl w-full h-full">
        <div className="w-full px-4">
          <div className="w-full justify-between flex items-center py-3">
            <h1 className="text-sm md:text-2xl sm:text-md font-semibold">
              Transactions
            </h1>
          </div>
          <div className="w-full justify-between flex items-center">
            <Input placeholder="Search ..." onChange={handleSearch} />
            <div className={"flex gap-5 items-center"}>
              <select
                defaultValue={"all"}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setFilter(e.target.value as FilterType)
                }
                className="select select-bordered select-sm w-full max-w-xs"
              >
                <option value={"all"} selected>
                  All
                </option>
                <option value={"ongoing"}>Ongoing</option>
                <option value={"returned"}>Returned</option>
                <option value={"approved"}>Approved</option>
                <option value={"pending"}>Pending</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="w-full h-[200px] flex justify-center items-center">
            <LoadingCircle />
          </div>
        ) : (
          <TransactionTable transactions={filteredTransactions} />
        )}
      </div>
    </div>
  );
}
