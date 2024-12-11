import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useState, ReactNode } from 'react';

type ItemWithSheetProps = {
  trigger: ReactNode;
  content: ReactNode;
};

export const ItemWithSheet = ({ trigger, content }: ItemWithSheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-pointer" onClick={() => setOpen(true)}>
                {trigger}
              </div>
            </TooltipTrigger>
            <TooltipContent>Click to open</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SheetTrigger>
      <SheetContent
        onOpenAutoFocus={event => event.preventDefault()}
        side="bottom"
        className="h-[80vh] pt-12 lg:h-[60vh]"
      >
        <ScrollArea className="h-full overflow-scroll">{content}</ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
