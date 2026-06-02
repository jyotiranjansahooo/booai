import { PricingTable } from "@clerk/nextjs";

export default function SubscriptionsPage() {
  return (
    <main className="wrapper container">
      <section className="clerk-pricing-container">
        <div className="clerk-pricing-table-wrapper">
          <PricingTable />
        </div>
      </section>
    </main>
  );
}
