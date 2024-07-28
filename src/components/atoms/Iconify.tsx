import { Icon } from "@iconify/react";

/**
 * A wrapper component for the Iconify icon library.
 *
 * @param {Object} props - The properties for the Iconify component.
 * @param {string} props.icon - The name of the icon to display.
 * @param {number|string} [props.fontSize] - The size of the icon.
 * @param {string} [props.color] - The color of the icon.
 * @return {JSX.Element} The Iconify component.
 */
export default function Iconify({
  // Destructure the props object to get the icon, fontSize, and color properties.
  // The spread operator is used to pass all the remaining properties to the Icon component.
  ...props
}: {
  icon: string;
  fontSize?: number | string;
  color?: string;
}) {
  // Render the Icon component with the provided props.
  return <Icon {...props} />;
}
