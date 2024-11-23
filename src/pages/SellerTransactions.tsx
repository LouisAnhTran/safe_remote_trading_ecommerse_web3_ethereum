import React from "react";
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";

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
import { stateMappingSeller } from "../constants";
import { Button } from "@/components/ui/button";
import { prepareContractCall } from "thirdweb";

interface AcknowledgeInterestParams {
  purchaseId: number;
  weiValue: number;
}

const SellerTransactions = () => {
  const account = useActiveAccount();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate: sendTransaction } = useSendTransaction();

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
      "function getPurchaseTransactionSeller(address sellerAddress) view returns ((uint256 purchaseId, address buyer, address seller, uint256 productId, uint256 quantity, uint8 status, uint256 requiredDepositBuyerInWei, uint256 requiredDepositSellerInWei)[])",
    params: [account ? account.address : "0x"],
  });

  console.log("purchase transactions data ", data);

  const acknowledgeInterest = async ({
    purchaseId,
    weiValue,
  }: AcknowledgeInterestParams) => {
    try {
      const transaction = await prepareContractCall({
        contract,
        method:
          "function sellerAcknowledgeBuyerInterest(uint256 _purchase_id) payable",
        params: [BigInt(purchaseId)],
        value: BigInt(weiValue), // Specify the value to send
      });

      console.log("Prepared transaction:", transaction);

      sendTransaction(transaction, {
        onSuccess: (result) => {
          console.log("Transaction success:", result);

          toast({
            title: "Succesesful transaction",
            description: "The product has been created succesesfully",
            variant: "success",
          });

          navigate("/");
        },
        onError: (error) => {
          console.error("Transaction failed:", error);
          console.log("transaction error: ", error.message);

          toast({
            title: "Failed transaction",
            description: "Error with transaction for creating product",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error("Error preparing transaction:", error);
      toast({
        title: "Failed transaction",
        description: "Error with transaction for creating product",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-row justify-center mt-10">
      <div className="w-10/12 flex flex-col">
        {data && data.length > 0 && (
          <Table>
            <TableCaption>A list of your recent transactions.</TableCaption>
            <TableHeader>
              <TableRow className="text-white">
                <TableHead>Purchase ID</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Product ID</TableHead>
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
                  <TableCell>{item.quantity.toString()}</TableCell>
                  <TableCell>
                    {Number(item.requiredDepositBuyerInWei.toString()) / 1e18}
                  </TableCell>
                  <TableCell>
                    {Number(item.requiredDepositSellerInWei.toString()) / 1e18}
                  </TableCell>
                  <TableCell>{stateMappingSeller[item.status]}</TableCell>
                  <TableCell>
                    {item.status == 0 && (
                      <Button
                        onClick={() =>
                          acknowledgeInterest({
                            purchaseId: Number(item.purchaseId),
                            weiValue: Number(item.requiredDepositSellerInWei),
                          })
                        }
                        className="bg-blue-400 hover:bg-blue-600"
                      >
                        Acknowledge
                      </Button>
                    )}

                    {item.status == 1 && (
                      <div className="flex flex-row space-x-2 justify-center">
                        <Button
                          onClick={() =>
                            acknowledgeInterest({
                              purchaseId: Number(item.purchaseId),
                              weiValue: Number(item.requiredDepositSellerInWei),
                            })
                          }
                          className="bg-red-400 hover:bg-red-600"
                        >
                          Abort - Withdraw Deposit
                        </Button>
                      </div>
                    )}

                    {item.status == 2 && (
                      <div className="flex flex-row space-x-2 justify-center">
                        <Button
                          onClick={() =>
                            acknowledgeInterest({
                              purchaseId: Number(item.purchaseId),
                              weiValue: Number(item.requiredDepositSellerInWei),
                            })
                          }
                          className="bg-amber-400 hover:bg-amber-500"
                        >
                          Deliver Product to Buyer
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default SellerTransactions;
