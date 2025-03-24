import { Profile2User, ShoppingCart, DollarCircle, InfoCircle } from "iconsax-react";

export const itemIcons: { [key: string]: JSX.Element } = {
  id: <InfoCircle size="20" color="#0052CC" />,
  name: <Profile2User size="20" color="#0052CC" />,
  price: <DollarCircle size="20" color="#28A745" />,
  description: <InfoCircle size="20" color="#FF9800" />,
  category: <ShoppingCart size="20" color="#E91E63" />
};


export const ItemsHeaderName: { [key: string]: string } = {
  id: 'Id',
  name: 'Product Name',
  price: 'Selling Price',
  description: 'Product Description',
  category: 'Product Category'
};