export type Order =
  | CrossBorderRemittanceOrder
  | CrossBorderSelfRemittanceOrder
  | LocalBuyStablecoinsOrder
  | LocalSellStablecoinsOrder;

export type BaseOrder = {
  orderId: string; // PK
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  orderStatus: OrderStatus;
  priceOracleRates: Record<string, number>;
  escrowDetails: EscrowDetails;
};

export type CrossBorderRemittanceOrder = BaseOrder & {
  orderType: OrderType.CROSS_BORDER_REMITTANCE;
  senderId: string; // GSI
  recipientId: string; // GSI
  senderAgentId: string; // GSI
  recipientAgentId?: string; // GSI
  fees: {
    platform: CommissionDetails;
    senderAgent: CommissionDetails;
    recipientAgent?: CommissionDetails;
  };
  transferTimelineStatus: CrossBorderRemittanceTimelineStatus;
  transferTimeline: CrossBorderRemittanceTransferTimeline[];
  transferDetails: {
    sender: TransferInfo;
    recipient: TransferInfo;
  };
  collectionDetails?: LocationDetails;
  deliveryDetails?: LocationDetails;
  contactDetails: {
    sender: ContactInfo;
    recipient: ContactInfo;
    senderAgent?: ContactInfo;
    recipientAgent?: ContactInfo;
  };
};

export interface CrossBorderSelfRemittanceOrder extends BaseOrder {
  orderType: OrderType.CROSS_BORDER_SELF_REMITTANCE;
  senderId: string; // GSI
  senderAgentId: string; // GSI
  recipientAgentId: string; // GSI
  arrivesAt: string;
  fees: {
    platform: CommissionDetails;
    senderAgent: CommissionDetails;
    recipientAgent: CommissionDetails;
  };
  transferTimelineStatus: CrossBorderSelfRemittanceTimelineStatus;
  transferDetails: {
    sender: TransferInfo;
    recipient: TransferInfo;
  };
  transferTimeline: CrossBorderSelfRemittanceTransferTimeline[];
  collectionDetails?: LocationDetails;
  deliveryDetails?: LocationDetails;
  contactDetails: {
    sender: ContactInfo;
    senderAgent: ContactInfo;
    recipientAgent: ContactInfo;
  };
}

export interface LocalBuyStablecoinsOrder extends BaseOrder {
  orderType: OrderType.LOCAL_BUY_STABLECOINS;
  senderId: string; // GSI
  senderAgentId: string; // GSI
  fees: {
    platform: CommissionDetails;
    senderAgent: CommissionDetails;
  };
  transferTimelineStatus: LocalBuyStablecoinsTimelineStatus;
  transferDetails: {
    sender: TransferInfo;
  };
  transferTimeline: LocalBuyStablecoinsTransferTimeline[];
  collectionDetails?: LocationDetails;
  contactDetails: {
    sender: ContactInfo;
    senderAgent: ContactInfo;
  };
  escrowDetails: {
    amount: number;
    initialAmount: number;
    token: string;
    tokenAddress: string;
    tokenDecimals: number;
    chain: string;
    chainId: number;
    escrow: string;
    depositTransaction?: string;
    releaseTransaction?: string;
    refundTransaction?: string;
  };
}

export interface LocalSellStablecoinsOrder extends BaseOrder {
  orderType: OrderType.LOCAL_SELL_STABLECOINS;
  recipientId: string; // GSI
  recipientAgentId: string; // GSI
  fees: {
    platform: CommissionDetails;
    recipientAgent: CommissionDetails;
  };
  transferTimelineStatus: LocalSellStablecoinsTimelineStatus;
  transferDetails: {
    recipient: TransferInfo;
  };
  transferTimeline: LocalSellStablecoinsTransferTimeline[];
  deliveryDetails?: LocationDetails;
  contactDetails: {
    recipient: ContactInfo;
    recipientAgent: ContactInfo;
  };
}

export interface CommissionDetails {
  commission: number;
  amount: number;
  token: string;
}

interface TransferInfo {
  amount: number;
  initialAmount: number;
  currency: string;
  countryIsoCode: string;
}

export interface LocationDetails {
  startDate: string;
  endDate: string;
  areaName: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  radius: {
    value: number;
    unit: string;
  };
}

export interface EscrowDetails {
  amount: number;
  initialAmount: number;
  token: string;
  tokenAddress?: string;
  tokenDecimals?: number;
  chain?: string;
  chainId?: number;
  escrow?: string;
  depositTransaction?: string;
  releaseTransaction?: string;
  refundTransaction?: string;
}

export interface ContactInfo {
  telegram: {
    deeplink: string;
    url: string;
  };
}

export enum OrderType {
  CROSS_BORDER_REMITTANCE = 'CROSS_BORDER_REMITTANCE',
  CROSS_BORDER_SELF_REMITTANCE = 'CROSS_BORDER_SELF_REMITTANCE',
  LOCAL_SELL_STABLECOINS = 'LOCAL_SELL_STABLECOINS',
  LOCAL_BUY_STABLECOINS = 'LOCAL_BUY_STABLECOINS',
}

// If sender in an order, return "SENT" on OrderStatus
// If recipient in an order, return "RECEIVED" on OrderStatus
export enum OrderStatus {
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export type TransferTimelineStatus =
  | CrossBorderRemittanceTimelineStatus
  | CrossBorderSelfRemittanceTimelineStatus
  | LocalBuyStablecoinsTimelineStatus
  | LocalSellStablecoinsTimelineStatus;

export type TransferTimeline =
  | CrossBorderRemittanceTransferTimeline
  | CrossBorderSelfRemittanceTransferTimeline
  | LocalBuyStablecoinsTransferTimeline
  | LocalSellStablecoinsTransferTimeline;

interface BaseTransferTimeline {
  dateTime: string;
  title: string;
  description: string;
  orderStatus: OrderStatus;
}

interface CrossBorderRemittanceTransferTimeline extends BaseTransferTimeline {
  status: CrossBorderRemittanceTimelineStatus;
}

interface CrossBorderSelfRemittanceTransferTimeline
  extends BaseTransferTimeline {
  status: CrossBorderSelfRemittanceTimelineStatus;
}

interface LocalBuyStablecoinsTransferTimeline extends BaseTransferTimeline {
  status: LocalBuyStablecoinsTimelineStatus;
}

interface LocalSellStablecoinsTransferTimeline extends BaseTransferTimeline {
  status: LocalSellStablecoinsTimelineStatus;
}

export enum CrossBorderRemittanceTimelineStatus {
  PENDING = 'PENDING',
  RECIPIENT_ACCEPTED = 'RECIPIENT_ACCEPTED',
  SENDER_AGENT_ACCEPTED = 'SENDER_AGENT_ACCEPTED',
  RECIPIENT_AGENT_ACCEPTED = 'RECIPIENT_AGENT_ACCEPTED',
  ORDER_ACCEPTED = 'ORDER_ACCEPTED',
  COLLECTION_MEETUP_SET = 'COLLECTION_MEETUP_SET',
  CASH_COLLECTED = 'CASH_COLLECTED',
  ESCROW_DEPOSITED = 'ESCROW_DEPOSITED',
  DELIVERY_MEETUP_SET = 'DELIVERY_MEETUP_SET',
  CASH_DELIVERED = 'CASH_DELIVERED',
  ESCROW_RELEASED = 'ESCROW_RELEASED',
  // Negative statuses
  RECIPIENT_REJECTED = 'RECIPIENT_REJECTED',
  SENDER_AGENT_REJECTED = 'SENDER_AGENT_REJECTED',
  RECIPIENT_AGENT_REJECTED = 'RECIPIENT_AGENT_REJECTED',
  ORDER_EXPIRED = 'ORDER_EXPIRED',
}

export enum CrossBorderSelfRemittanceTimelineStatus {
  PENDING = 'PENDING',
  SENDER_AGENT_ACCEPTED = 'SENDER_AGENT_ACCEPTED',
  RECIPIENT_AGENT_ACCEPTED = 'RECIPIENT_AGENT_ACCEPTED',
  ORDER_ACCEPTED = 'ORDER_ACCEPTED',
  COLLECTION_MEETUP_SET = 'COLLECTION_MEETUP_SET',
  CASH_COLLECTED = 'CASH_COLLECTED',
  ESCROW_DEPOSITED = 'ESCROW_DEPOSITED',
  SENDER_ARRIVED = 'SENDER_ARRIVED',
  DELIVERY_MEETUP_SET = 'DELIVERY_MEETUP_SET',
  CASH_DELIVERED = 'CASH_DELIVERED',
  ESCROW_RELEASED = 'ESCROW_RELEASED',
  // Negative statuses
  SENDER_AGENT_REJECTED = 'SENDER_AGENT_REJECTED',
  RECIPIENT_AGENT_REJECTED = 'RECIPIENT_AGENT_REJECTED',
  ORDER_EXPIRED = 'ORDER_EXPIRED',
}

export enum LocalBuyStablecoinsTimelineStatus {
  PENDING = 'PENDING',
  SENDER_AGENT_ACCEPTED = 'SENDER_AGENT_ACCEPTED',
  ESCROW_DEPOSITED = 'ESCROW_DEPOSITED',
  COLLECTION_MEETUP_SET = 'COLLECTION_MEETUP_SET',
  CASH_COLLECTED = 'CASH_COLLECTED',
  ESCROW_RELEASED = 'ESCROW_RELEASED',
  // Negative statuses
  SENDER_AGENT_REJECTED = 'SENDER_AGENT_REJECTED',
  ORDER_EXPIRED = 'ORDER_EXPIRED',
}

export enum LocalSellStablecoinsTimelineStatus {
  PENDING = 'PENDING',
  RECIPIENT_AGENT_ACCEPTED = 'RECIPIENT_AGENT_ACCEPTED',
  ESCROW_DEPOSITED = 'ESCROW_DEPOSITED',
  DELIVERY_MEETUP_SET = 'DELIVERY_MEETUP_SET',
  CASH_DELIVERED = 'CASH_DELIVERED',
  ESCROW_RELEASED = 'ESCROW_RELEASED',
  // Negative statuses
  RECIPIENT_AGENT_REJECTED = 'RECIPIENT_AGENT_REJECTED',
  ORDER_EXPIRED = 'ORDER_EXPIRED',
}

// Order Pagination
export interface PaginatedOrders {
  orders: Order[];
  pageSize: number;
  pageNumber: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface OrderKey {
  orderId: string;
  // also contains index key...
}
