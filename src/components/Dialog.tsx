import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

type props = {
  children: React.ReactNode;
  description?: string;
  name: string;
  title: string;
  className?: string;
};

export function DialogButton({
  children,
  description,
  name,
  title,
  className,
}: props) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"default"} type="button">
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
