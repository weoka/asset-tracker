export interface TokenBalance {
  token_address?: string;
  name?: string;
  symbol?: string;
  logo?: string;
  thumbnail?: string;
  decimals?: number;
  balance?: string | number | null | undefined;
  possible_spam?: string | null;
  verified_collection?: string | null;
  total_supply?: string;
  total_supply_formatted?: string;
  percentage_relative_to_total_supply?: number;
}
