import * as Icons from "@entur/icons";
import React from "react";
import { storiesOf } from "@storybook/react";

import { PulseDot, PulseCircle, PulseRing } from ".";

storiesOf("Pulse-Dot", module)
  .add("default", () => (
    <PulseDot>
      <PulseCircle></PulseCircle>
      <PulseRing></PulseRing>
    </PulseDot>
  ))
  .add("custom color", () => (
    <PulseDot>
      <PulseCircle inputColor="red"></PulseCircle>
      <PulseRing inputColor="pink"></PulseRing>
    </PulseDot>
  ))
  .add("custom size", () => (
    <PulseDot>
      <PulseCircle inputColor="red" size="50px"></PulseCircle>
      <PulseRing inputColor="pink" size="50px"></PulseRing>
    </PulseDot>
  ));

storiesOf("Icons", module)
  .add("Add", () => <Icons.AddIcon />)
  .add("Adjustments", () => <Icons.AdjustmentsIcon />)
  .add("Agrees", () => <Icons.AgreesIcon />)
  .add("AlignCenter", () => <Icons.AlignCenterIcon />)
  .add("AlignLeft", () => <Icons.AlignLeftIcon />)
  .add("AlignRight", () => <Icons.AlignRightIcon />)
  .add("Animal", () => <Icons.AnimalIcon />)
  .add("Attachment", () => <Icons.AttachmentIcon />)
  .add("BackArrow", () => <Icons.BackArrowIcon />)
  .add("Banknote", () => <Icons.BanknoteIcon />)
  .add("BanknoteMulti", () => <Icons.BanknoteMultiIcon />)
  .add("Battery", () => <Icons.BatteryIcon />)
  .add("Bell", () => <Icons.BellIcon />)
  .add("BicycleHotel", () => <Icons.BicycleHotelIcon />)
  .add("Bicycle", () => <Icons.BicycleIcon />)
  .add("BicycleParking", () => <Icons.BicycleParkingIcon />)
  .add("Bold", () => <Icons.BoldIcon />)
  .add("BulletList", () => <Icons.BulletListIcon />)
  .add("Bus", () => <Icons.BusIcon />)
  .add("BusShelter", () => <Icons.BusShelterIcon />)
  .add("Cableway", () => <Icons.CablewayIcon />)
  .add("Camera", () => <Icons.CameraIcon />)
  .add("Car", () => <Icons.CarIcon />)
  .add("Carferry", () => <Icons.CarferryIcon />)
  .add("Chat", () => <Icons.ChatIcon />)
  .add("Check", () => <Icons.CheckIcon />)
  .add("Clock", () => <Icons.ClockIcon />)
  .add("Close", () => <Icons.CloseIcon />)
  .add("Coffee", () => <Icons.CoffeeIcon />)
  .add("Collapsed", () => <Icons.CollapsedIcon />)
  .add("ColorPicker", () => <Icons.ColorPickerIcon />)
  .add("Comment", () => <Icons.CommentIcon />)
  .add("Company", () => <Icons.CompanyIcon />)
  .add("Configuration", () => <Icons.ConfigurationIcon />)
  .add("Contacts", () => <Icons.ContactsIcon />)
  .add("Cutlery", () => <Icons.CutleryIcon />)
  .add("Date", () => <Icons.DateIcon />)
  .add("Delete", () => <Icons.DeleteIcon />)
  .add("Denmark", () => <Icons.DenmarkIcon />)
  .add("Deposition", () => <Icons.DepositionIcon />)
  .add("Desktop", () => <Icons.DesktopIcon />)
  .add("Diff", () => <Icons.DiffIcon />)
  .add("DownArrow", () => <Icons.DownArrowIcon />)
  .add("Download", () => <Icons.DownloadIcon />)
  .add("Downward", () => <Icons.DownwardIcon />)
  .add("Edit", () => <Icons.EditIcon />)
  .add("Email", () => <Icons.EmailIcon />)
  .add("Euro", () => <Icons.EuroIcon />)
  .add("Facebook", () => <Icons.FacebookIcon />)
  .add("Ferry", () => <Icons.FerryIcon />)
  .add("File", () => <Icons.FileIcon />)
  .add("Fine", () => <Icons.FineIcon />)
  .add("Forward", () => <Icons.ForwardIcon />)
  .add("Funicular", () => <Icons.FunicularIcon />)
  .add("Goal", () => <Icons.GoalIcon />)
  .add("Google", () => <Icons.GoogleIcon />)
  .add("GridView", () => <Icons.GridViewIcon />)
  .add("Heart", () => <Icons.HeartIcon />)
  .add("Helicopter", () => <Icons.HelicopterIcon />)
  .add("Home", () => <Icons.HomeIcon />)
  .add("HorizontalDots", () => <Icons.HorizontalDotsIcon />)
  .add("Image", () => <Icons.ImageIcon />)
  .add("Instagram", () => <Icons.InstagramIcon />)
  .add("International", () => <Icons.InternationalIcon />)
  .add("Interrail", () => <Icons.InterrailIcon />)
  .add("Italic", () => <Icons.ItalicIcon />)
  .add("Laptop", () => <Icons.LaptopIcon />)
  .add("LeftArrow", () => <Icons.LeftArrowIcon />)
  .add("Like", () => <Icons.LikeIcon />)
  .add("Link", () => <Icons.LinkIcon />)
  .add("ListView", () => <Icons.ListViewIcon />)
  .add("Loading", () => <Icons.LoadingIcon />)
  .add("Location", () => <Icons.LocationIcon />)
  .add("LogoNegative", () => <Icons.LogoNegativeIcon />)
  .add("LogoPositive", () => <Icons.LogoPositiveIcon />)
  .add("Luggage", () => <Icons.LuggageIcon />)
  .add("Map", () => <Icons.MapIcon />)
  .add("MapPin", () => <Icons.MapPinIcon />)
  .add("Menu", () => <Icons.MenuIcon />)
  .add("MergeProfiles", () => <Icons.MergeProfilesIcon />)
  .add("Mobile", () => <Icons.MobileIcon />)
  .add("Money", () => <Icons.MoneyIcon />)
  .add("Norway", () => <Icons.NorwayIcon />)
  .add("Organization", () => <Icons.OrganizationIcon />)
  .add("ParkAndRide", () => <Icons.ParkAndRideIcon />)
  .add("Park", () => <Icons.ParkIcon />)
  .add("ParkingGarage", () => <Icons.ParkingGarageIcon />)
  .add("PeriodeTicket", () => <Icons.PeriodeTicketIcon />)
  .add("Phone", () => <Icons.PhoneIcon />)
  .add("Plane", () => <Icons.PlaneIcon />)
  .add("Position", () => <Icons.PositionIcon />)
  .add("PremiumSeat", () => <Icons.PremiumSeatIcon />)
  .add("PriceFrom", () => <Icons.PriceFromIcon />)
  .add("Pricelist", () => <Icons.PricelistIcon />)
  .add("Printer", () => <Icons.PrinterIcon />)
  .add("Qr", () => <Icons.QrIcon />)
  .add("Question", () => <Icons.QuestionIcon />)
  .add("Reference", () => <Icons.ReferenceIcon />)
  .add("Refresh", () => <Icons.RefreshIcon />)
  .add("Reports", () => <Icons.ReportsIcon />)
  .add("Rescue", () => <Icons.RescueIcon />)
  .add("Reset", () => <Icons.ResetIcon />)
  .add("RightArrow", () => <Icons.RightArrowIcon />)
  .add("Running", () => <Icons.RunningIcon />)
  .add("Salesplace", () => <Icons.SalesplaceIcon />)
  .add("Sanntid", () => <Icons.SanntidIcon />)
  .add("Save", () => <Icons.SaveIcon />)
  .add("Scooter", () => <Icons.ScooterIcon />)
  .add("Search", () => <Icons.SearchIcon />)
  .add("Seat", () => <Icons.SeatIcon />)
  .add("Settings", () => <Icons.SettingsIcon />)
  .add("Share", () => <Icons.ShareIcon />)
  .add("ShoppingCart", () => <Icons.ShoppingCartIcon />)
  .add("Skype", () => <Icons.SkypeIcon />)
  .add("SourceCode", () => <Icons.SourceCodeIcon />)
  .add("Standard", () => <Icons.StandardIcon />)
  .add("Standing", () => <Icons.StandingIcon />)
  .add("Starred", () => <Icons.StarredIcon />)
  .add("Stats", () => <Icons.StatsIcon />)
  .add("Stroller", () => <Icons.StrollerIcon />)
  .add("Strolling", () => <Icons.StrollingIcon />)
  .add("Subtract", () => <Icons.SubtractIcon />)
  .add("Subway", () => <Icons.SubwayIcon />)
  .add("Suitcase", () => <Icons.SuitcaseIcon />)
  .add("Sweden", () => <Icons.SwedenIcon />)
  .add("Switch", () => <Icons.SwitchIcon />)
  .add("Taxi", () => <Icons.TaxiIcon />)
  .add("Teddy", () => <Icons.TeddyIcon />)
  .add("TextColor", () => <Icons.TextColorIcon />)
  .add("Ticket", () => <Icons.TicketIcon />)
  .add("ToFrom", () => <Icons.ToFromIcon />)
  .add("Toilet", () => <Icons.ToiletIcon />)
  .add("Track", () => <Icons.TrackIcon />)
  .add("Train", () => <Icons.TrainIcon />)
  .add("Tram", () => <Icons.TramIcon />)
  .add("Transfer", () => <Icons.TransferIcon />)
  .add("Tvm", () => <Icons.TvmIcon />)
  .add("Twitter", () => <Icons.TwitterIcon />)
  .add("Underline", () => <Icons.UnderlineIcon />)
  .add("Unlink", () => <Icons.UnlinkIcon />)
  .add("Unstarred", () => <Icons.UnstarredIcon />)
  .add("Unview", () => <Icons.UnviewIcon />)
  .add("UpArrow", () => <Icons.UpArrowIcon />)
  .add("Upload", () => <Icons.UploadIcon />)
  .add("Upward", () => <Icons.UpwardIcon />)
  .add("User", () => <Icons.UserIcon />)
  .add("Users", () => <Icons.UsersIcon />)
  .add("ValidationCheck", () => <Icons.ValidationCheckIcon />)
  .add("ValidationError", () => <Icons.ValidationErrorIcon />)
  .add("ValidationExclamation", () => <Icons.ValidationExclamationIcon />)
  .add("ValidationInfo", () => <Icons.ValidationInfoIcon />)
  .add("VerticalDots", () => <Icons.VerticalDotsIcon />)
  .add("View", () => <Icons.ViewIcon />)
  .add("Vimeo", () => <Icons.VimeoIcon />)
  .add("WaitingRoom", () => <Icons.WaitingRoomIcon />)
  .add("Walking", () => <Icons.WalkingIcon />)
  .add("Warning", () => <Icons.WarningIcon />)
  .add("Wheelchair", () => <Icons.WheelchairIcon />)
  .add("Wifi", () => <Icons.WifiIcon />)
  .add("Youtube", () => <Icons.YoutubeIcon />)
  .add("ZoomIn", () => <Icons.ZoomInIcon />)
  .add("ZoomOut", () => <Icons.ZoomOutIcon />);
