import { Badge } from "@chakra-ui/react";


export const Meta = ({ 
  children
} : {
  children: React.ReactNode
}) => (
    <Badge colorScheme="green" mr={2}>
      {children}
    </Badge>
);

export const MetaPlace = ({ 
  children
} : {
  children: React.ReactNode
}) => (
    <div className="grid grid-cols-6 sm:gap-x-4 gap-x-2 py-1">
      {children}
    </div>
);