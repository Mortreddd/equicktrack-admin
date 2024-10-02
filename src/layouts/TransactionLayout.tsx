import Input from "../components/common/Input";
import { Button } from "../components/common/Button";
import TransactionTable from "../components/common/tables/TransactionTable";
import { useGetTransactions } from "../api/transactions/useGetTransactions";
import LoadingCircle from "../components/common/LoadingCircle";

export default function TransactionLayout() {
  //   const [filteredTransactions, setFilteredTransactions] = useState<
  //     Transaction[]
  //   >([]);
  // const debounceSearch = useDebounce(search);
  const { result, isLoading } = useGetTransactions({ pageNo: 0, pageSize: 10 });

  //   useEffect(() => {
  //     const filteredTransactions = transactions.filter((transactions) =>
  //       transactions.equipment?.name
  //         .toLowerCase()
  //         .includes(debounceSearch.toLowerCase())
  //     );

  //     setFilteredTransactions(filteredTransactions);
  //   }, [debounceSearch]);

  // function handleSearch(e: ChangeEvent<HTMLInputElement>) {
  //   setSearch(e.target.value);
  // }

  return (
    <div className="w-full h-full">
      <div className="py-4 bg-gray-100 rounded-xl w-full h-full">
        <div className="w-full px-4">
          <div className="w-full justify-between flex items-center">
            <Input placeholder="Search ..." />
            <Button>Filters</Button>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full h-[200px] flex justify-center items-center">
            <LoadingCircle />
          </div>
        ) : (
          <TransactionTable transactions={result?.content ?? []} />
        )}
      </div>
    </div>
  );
}
