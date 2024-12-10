import React from "react";
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";
import ReactLoading from "react-loading";

import { contract } from "@/main";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { stateMappingBuyer } from "../constants";
import { Button } from "@/components/ui/button";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { useDispatch } from "react-redux";
import { setToLoad, unLoad } from "@/features/load/loadSlice";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ProductHover from "@/components/ProductHover";

interface ConfirmIntestestParams {
  purchaseId: number;
  weiValue: number;
}

interface ConfirmReceiptProductParams {
  purchaseId: number;
}

interface BuyerDiscardInterestToBuyProductParams {
  purchaseId: number;
}

const BuyerTransactions = () => {
  const account = useActiveAccount();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate: sendTransaction } = useSendTransaction();
  const dispatch=useDispatch()

  
  if (!account) {
    toast({
      title: "Error",
      description: "Please connect to wallet first",
      variant: "destructive",
    });

    navigate("/");
  }

  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getPurchaseTransactionBuyer(address buyerAddress) view returns ((uint256 purchaseId, address buyer, address seller, uint256 productId, uint256 quantity, uint8 status, uint256 requiredDepositBuyerInWei, uint256 requiredDepositSellerInWei)[])",
    params: [account ? account.address : "0x"],
  });

  console.log("purchase transactions data ", data);

  // all actions over here
  // buyer confirm purchase
  const confirmPurchase = async ({
    purchaseId,
    weiValue,
  }: ConfirmIntestestParams) => {
    try {
      dispatch(setToLoad())

      const transaction = await prepareContractCall({
        contract,
        method: "function buyerConfirmPurchase(uint256 _purchase_id) payable",
        params: [BigInt(purchaseId)],
        value: BigInt(weiValue), // Specify the value to send
      });

      console.log("Prepared transaction:", transaction);

      sendTransaction(transaction, {
        onSuccess: (result) => {
          console.log("Transaction success:", result);

          toast({
            title: "Succesesful transaction",
            description: "Purchase has been succesesfully confirmed",
            variant: "success",
          });

          navigate("/buyer-transactions");

          dispatch(unLoad())

        },
        onError: (error) => {
          console.error("Transaction failed:", error);
          console.log("transaction error: ", error.message);

          toast({
            title: "Failed transaction",
            description: "Error with transaction for creating product",
            variant: "destructive",
          });

          dispatch(unLoad())

        },
      });
    } catch (error) {
      console.error("Error preparing transaction:", error);
      toast({
        title: "Failed transaction",
        description: "Error with transaction for creating product",
        variant: "destructive",
      });

      dispatch(unLoad())
    }
  };

  // confirm receipt of product
  const buyerCancelInterestToBuyProduct = async ({
    purchaseId,
  }: BuyerDiscardInterestToBuyProductParams) => {
    try {
      dispatch(setToLoad())

      const transaction = await prepareContractCall({
        contract,
        method: "function buyerDiscardInterestForProduct(uint256 _purchase_id)",
        params: [BigInt(purchaseId)],
      });

      console.log("Prepared transaction:", transaction);

      sendTransaction(transaction, {
        onSuccess: (result) => {
          console.log("Transaction success:", result);

          toast({
            title: "Succesesful transaction",
            description:
              "You succesesfully cancel your interest to buy product",
            variant: "success",
          });

          navigate("/buyer-transactions");

          dispatch(unLoad())

        },
        onError: (error) => {
          console.error("Transaction failed:", error);
          console.log("transaction error: ", error.message);

          toast({
            title: "Failed transaction",
            description: "Error with transaction for creating product",
            variant: "destructive",
          });

          dispatch(unLoad())

        },
      });
    } catch (error) {
      console.error("Error preparing transaction:", error);
      toast({
        title: "Failed transaction",
        description: "Error with transaction for creating product",
        variant: "destructive",
      });

      dispatch(unLoad())

    }
  };

  // confirm receipt of product
  const confirmReceiptProduct = async ({
    purchaseId,
  }: ConfirmReceiptProductParams) => {
    try {
      dispatch(setToLoad())

      const transaction = await prepareContractCall({
        contract,
        method: "function buyerConfirmReceivingProduct(uint256 _purchase_id)",
        params: [BigInt(purchaseId)],
      });

      console.log("Prepared transaction:", transaction);

      sendTransaction(transaction, {
        onSuccess: (result) => {
          console.log("Transaction success:", result);

          toast({
            title: "Succesesful transaction",
            description: "Receipt of product has been succesesfully confirmed",
            variant: "success",
          });

          navigate("/buyer-transactions");

          dispatch(unLoad())

        },
        onError: (error) => {
          console.error("Transaction failed:", error);
          console.log("transaction error: ", error.message);

          toast({
            title: "Failed transaction",
            description: "Error with transaction for creating product",
            variant: "destructive",
          });

          dispatch(unLoad())

        },
      });
    } catch (error) {
      console.error("Error preparing transaction:", error);
      toast({
        title: "Failed transaction",
        description: "Error with transaction for creating product",
        variant: "destructive",
      });

      dispatch(unLoad())

    }
  };

  return (
    <div className="flex flex-row justify-center mt-10">
      {isPending && (
        <div className="w-full h-full flex flex-col justify-center items-center space-y-16 mt-40">
          <ReactLoading
            type={"spinningBubbles"}
            color={"#5588F6"}
            height={30}
            width={80}
          />
          <p className="text-[#5588F6] font-semibold">Loading...</p>
        </div>
      )}

      {!isPending && (
        <div className="w-10/12 flex flex-col">
           {data && data.length == 0 && (
            <div className="flex flex-row justify-center items-center pt-10">
              <p className="text-slate-400">There is no transactions for sellers</p>
            </div>
          )}

          {data && data.length > 0 && (
            <Table>
              <TableCaption>A list of your recent transactions.</TableCaption>
              <TableHeader>
                <TableRow className="text-white">
                  <TableHead>Purchase ID</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Product Details</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Deposit Buyer (Ether)</TableHead>
                  <TableHead>Deposit Seller (Ether)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.purchaseId.toString()}</TableCell>
                    <TableCell>{item.seller}</TableCell>
                    <TableCell>{item.productId.toString()}</TableCell>
                    <TableCell>
                      <HoverCard>

                        <HoverCardTrigger>
                          <p className="underline text-blue-600">details</p> 
                        </HoverCardTrigger>

                        <HoverCardContent className="bg-white opacity-90 p-4 w-[300px] h-[220px] rounded-2xl border-2 border-black">
                          <ProductHover productId={item.productId.toString()}></ProductHover>
                        </HoverCardContent>

                      </HoverCard>
                     
                    </TableCell>
                    <TableCell>{item.quantity.toString()}</TableCell>
                    <TableCell>
                      {Number(item.requiredDepositBuyerInWei.toString()) / 1e18}
                    </TableCell>
                    <TableCell>
                      {Number(item.requiredDepositSellerInWei.toString()) /
                        1e18}
                    </TableCell>
                    <TableCell>{stateMappingBuyer[item.status]}</TableCell>

                    <TableCell>
                      {item.status == 0 && (
                        <Button
                          onClick={() =>
                            buyerCancelInterestToBuyProduct({
                              purchaseId: Number(item.purchaseId),
                            })
                          }
                          className="bg-red-400 hover:bg-red-600"
                        >
                          Cancel Transaction
                        </Button>
                      )}

                      {item.status == 1 && (
                        <div className="flex flex-row space-x-2 justify-center">
                          <Button
                            onClick={() =>
                              confirmPurchase({
                                purchaseId: Number(item.purchaseId),
                                weiValue: Number(
                                  item.requiredDepositBuyerInWei
                                ),
                              })
                            }
                            className="bg-purple-400 hover:bg-purple-600"
                          >
                            Confirm Purchase
                          </Button>
                        </div>
                      )}

                      {item.status == 2 && (
                        <div className="flex flex-row space-x-2 justify-center">
                          <Button
                            onClick={() =>
                              confirmReceiptProduct({
                                purchaseId: Number(item.purchaseId),
                              })
                            }
                            className="bg-green-400 hover:bg-green-600"
                          >
                            Confirm Receipt of Product
                          </Button>
                        </div>
                      )}

                      {item.status == 3 && (
                        <div className="flex flex-row space-x-2 justify-center">
                          <p>No further action required </p>
                        </div>
                      )}

                      {item.status == 4 && (
                        <div className="flex flex-row space-x-2 justify-center">
                          <p>No further action required </p>
                        </div>
                      )}

                      {item.status == 5 && (
                        <div className="flex flex-row space-x-2 justify-center">
                          <p>Successful - No further action required </p>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
};

export default BuyerTransactions;
