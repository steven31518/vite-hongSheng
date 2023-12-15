import { useGetCouponData } from "./get coupon hook";
import { DataTable } from "../adminTable/DataTable";
import { coupon_columns } from "../adminTable/coupon column";

export function AdminCoupons() {
  const { data, isPending, isError, error, isSuccess } = useGetCouponData(
    (data) =>
      data.coupons.map((coupon) => {
        return {
          ...coupon,
          due_date: new Date(coupon.due_date),
        };
      })
  );
  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      {isSuccess && (
        <div className="container mx-auto py-3">
          <DataTable columns={coupon_columns} data={data} />
        </div>
      )}
    </div>
  );
}
