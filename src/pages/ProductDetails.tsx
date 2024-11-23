import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";
import { contract } from "@/main";

import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { prepareContractCall } from "thirdweb";

// Transform string to number for quantity
const formSchema = z.object({
  quantity: z
    .string()
    .refine((val) => !isNaN(Number(val)), {
      message: "Quantity must be a number.",
    })
    .transform((val) => Number(val))
    .refine((val) => val >= 1, {
      message: "Quantity must be at least 1.",
    }),
});

const ProductDetails = () => {
  const param = useParams();
  const { mutate: sendTransaction } = useSendTransaction();
  const { toast } = useToast();
  const navigate = useNavigate();

  //   make sure user connect to wallet
  const account = useActiveAccount();

  console.log("account: ", account);

  const { data, isPending } = useReadContract({
    contract,
    method:
      "function returnAllProducts() view returns ((uint256 productId, address seller, string sellerName, string name, uint256 priceInWei, string description, string image, string category)[])",
    params: [],
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("product id: ", param.id);
    console.log("form all value - quantity: ", values.quantity);

    if (!account) {
      toast({
        title: "Failed transaction",
        description: "Please connect to wallet first",
        variant: "destructive",
      });
      return;
    }

    try {
      const transaction = await prepareContractCall({
        contract,
        method:
          "function buyerIndicateInterestToBuyProduct(uint256 _productId, uint256 _quantity)",
        params: [BigInt(Number(param.id)), BigInt(values.quantity)],
      });

      console.log("Prepared transaction:", transaction);

      sendTransaction(transaction, {
        onSuccess: (result) => {
          console.log("Transaction success:", result);

          toast({
            title: "Succesesful transaction",
            description:
              "Your request to buy product has been succesesfully sent",
            variant: "success",
          });

          navigate("/purchase-transactions");
        },
        onError: (error) => {
          console.log("Transaction failed:", error);
          console.error("Transaction failed:", error);

          toast({
            title: "Failed transaction",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error("Error preparing transaction:", error);
      toast({
        title: "Failed transaction",
        description:
          "Error with transaction for showing interest to buy product",
        variant: "destructive",
      });
    }
  }

  console.log("param product id: ", param.id);

  let product = null;
  if (data) {
    product = data.find((item) => Number(item.productId) === Number(param.id));
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  return (
    <div className="flex flex-row justify-center">
      ProductDetails
      {product && (
        <div className="w-6/12 bg-[#1C1C24] h-[500px] rounded-2xl p-8 text-[#808191]">
          <p> Product Name: {product.name}</p>
          <p> Seller Name: {product.sellerName}</p>
          <p> Seller: {product.seller}</p>
          <p> Price: {Number(product.priceInWei) / 1e18} ether </p>
          <p> Description: {product.description}</p>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#808191] font-semibold">
                      Quantity
                    </FormLabel>
                    <FormControl className="text-[#808191]">
                      <Input
                        placeholder="1"
                        {...field}
                        className="focus:border-slate-500 border-[#3a3a43] p-6 hover:border-slate-500 w-[60px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-[#5588F6] px-10 text-lg font-bold hover:bg-[#5588F6] hover:opacity-75 transition-all"
              >
                Interest to buy ?
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
