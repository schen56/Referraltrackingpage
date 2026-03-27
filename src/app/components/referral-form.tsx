import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UserPlus } from "lucide-react";

export type ReferralFormData = {
  name: string;
  email: string;
  status: "pending" | "completed" | "rejected";
  giftcardAmount: number;
};

type ReferralFormProps = {
  onSubmit: (data: ReferralFormData) => void;
};

export function ReferralForm({ onSubmit }: ReferralFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReferralFormData>({
    defaultValues: {
      status: "pending",
      giftcardAmount: 0,
    },
  });

  const status = watch("status");

  const onFormSubmit = (data: ReferralFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="size-5" />
          Add New Referral
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Referral Name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value) =>
                setValue(
                  "status",
                  value as "pending" | "completed" | "rejected"
                )
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="giftcardAmount">Gift Card Amount ($)</Label>
            <Input
              id="giftcardAmount"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("giftcardAmount", {
                required: "Amount is required",
                min: { value: 0, message: "Amount must be positive" },
                valueAsNumber: true,
              })}
            />
            {errors.giftcardAmount && (
              <p className="text-sm text-red-500">
                {errors.giftcardAmount.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Add Referral
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
