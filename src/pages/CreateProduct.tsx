import React, { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../main";
import { Button } from "@/components/ui/button";

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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToLoad, unLoad } from "@/features/load/loadSlice";

const formSchema = z.object({
  sellerName: z.string().min(2, {
    message: "Seller name must be at least 2 characters.",
  }),
  productName: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  price: z.preprocess((val) => parseFloat(val), z.number().positive({
    message: "Price must be a positive number.",
  })),
  description: z.string().min(10, {
    message: "You must provide as much detail as possible for your product",
  }),
  image: z.string().url({
    message: "Image must be a valid URL",
  }),
  category: z.string().min(5, {
    message: "Product category must be 5 characters long",
  }),
});

const CreateProduct = () => {
  const { mutate: sendTransaction } = useSendTransaction();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate=useNavigate();
  const dispatch = useDispatch();


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sellerName: "Louis Anh Tran",
      productName: "LFC Token",
      price: 0.01,
      description: "The most liquid and valuable token in Ethereum",
      image:
        "https://imageio.forbes.com/specials-images/imageserve/66f508976bb31223eca58524/An-image-of-an-Ethereum-crypto-coin-to-represent-the-question-what-is-Ethereum-/960x0.jpg?format=jpg&width=960",
      category: "Ethereum Tokens",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("form all value: ", values);

    try {
      dispatch(setToLoad());

      const transaction = await prepareContractCall({
        contract,
        method:
          "function createProduct(string _sellerName, string _name, uint256 _priceInWei, string _description, string _image, string _category)",
        params: [
          values.sellerName,
          values.productName,
          BigInt(values.price*1e18),
          values.description,
          values.image,
          values.category,
        ],
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

          navigate("/")

          dispatch(unLoad());
        },
        onError: (error) => {
          console.error("Transaction failed:", error);
          toast({
            title: "Failed transaction",
            description: "Error with transaction for creating product",
            variant: "destructive",
          });

          dispatch(unLoad());

        },
      });
    } catch (error) {
      console.error("Error preparing transaction:", error);
      toast({
        title: "Failed transaction",
        description: "Error with transaction for creating product",
        variant: "destructive",
      });
      dispatch(unLoad());
    }
    
  }


  return (
    <div className="overflow-auto mt-8">
      <div className="w-full flex flex-row justify-center">
        <div className="w-6/12 p-12 bg-[#1C1C24] rounded-2xl px-24">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="sellerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#808191] font-semibold">
                      Seller Name *
                    </FormLabel>
                    <FormControl className="text-[#808191]">
                      <Input
                        placeholder="Louis Anh Tran"
                        {...field}
                        className="focus:border-slate-500 border-[#3a3a43] p-4 hover:border-slate-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#808191] font-semibold">
                      Product Name *
                    </FormLabel>
                    <FormControl className="text-[#808191]">
                      <Input
                        placeholder="LFC Token"
                        {...field}
                        className="focus:border-slate-500 border-[#3a3a43] p-4 hover:border-slate-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* price */}
              <div>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#808191] font-semibold">
                        Product Price (Ethers) *
                      </FormLabel>
                      <FormControl className="text-[#808191]">
                        <Input
                          placeholder="0.01"
                          {...field}
                          className="focus:border-slate-500 border-[#3a3a43] p-4 hover:border-slate-500 text-[#808191]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#808191] font-semibold">
                      Description
                    </FormLabel>
                    <FormControl className="text-[#808191]">
                      <Input
                        placeholder="The most liquid and valuable token in Ethereum"
                        {...field}
                        className="focus:border-slate-500 border-[#3a3a43] p-4 hover:border-slate-500 text-[#808191] h-[100px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#808191] font-semibold">
                      Product Image URL *
                    </FormLabel>
                    <FormControl className="text-[#808191]">
                      <Input
                        placeholder="https://...."
                        {...field}
                        className="focus:border-slate-500 border-[#3a3a43] p-4 hover:border-slate-500 text-[#808191]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* // Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#808191] font-semibold">
                      Product Category *
                    </FormLabel>
                    <FormControl className="text-[#808191]">
                      <Input
                        placeholder="Ethereum Tokens"
                        {...field}
                        className="focus:border-slate-500 border-[#3a3a43] p-4 hover:border-slate-500 text-[#808191]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row justify-center items-center">
                <Button
                  type="submit"
                  className="bg-[#5588F6] px-10 text-lg font-bold hover:bg-[#5588F6] hover:opacity-75 transition-all"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
