import Index from "./Index";

export default function TermsAndPrivacy() {
  return (
    <Index>
      <div className="w-full h-full">
        <div className="w-full h-full py-8 md:py-10 md:px-20 px-5 sm:px-10">
          <h1 className="lg:text-3xl text-2xl font-sans text-center font-bold mb-5 md:mb-10 text-black">
            EquickTrack Terms of Service
          </h1>
          <section className="w-full my-3 md:my-5">
            <h1 className="text-xl font-sans text-black">
              1. <strong>Acceptance of Terms</strong>
            </h1>
            <p className="text-black font-sans text-xl pl-10 md:pl-20 mt-2 md:mt-4">
              By using EquickTrack, users agree to comply with these terms. If
              users do not agree with any part of the terms, they should not use
              the system.
            </p>
          </section>
          <section className="w-full my-3 md:my-5">
            <h1 className="text-xl font-sans text-black">
              2. <strong>Updating Account Information</strong>
            </h1>
            <p className="text-black font-sans text-xl pl-10 md:pl-20 mt-2 md:mt-4">
              <strong>Accuracy of Information</strong>: Users must provide
              accurate and complete information when using the system.
            </p>
            <p className="text-black font-sans text-xl pl-10 md:pl-20 mt-2 md:mt-4">
              <strong>Proper use of Equipment</strong>: Users are responsible
              for handling borrowed equipment carefully and using it solely for
              academic purposes.
            </p>
          </section>
          <section className="w-full my-3 md:my-5">
            <h1 className="text-xl font-sans text-black">
              3. <strong>Borrowing and Returning Equipment</strong>
            </h1>
            <p className="text-black font-sans text-xl pl-10 md:pl-20 mt-2 md:mt-4">
              <strong>Borrowing Requests</strong>: Users must submit requests
              via the mobile app. Approval depends on equipment availability.
            </p>
            <p className="text-black font-sans text-xl pl-10 md:pl-20 mt-2 md:mt-4">
              <strong>Return Deadlines</strong>: Users must return borrowed
              equipment by the due date specified. Notifications will be sent as
              reminders.
            </p>
          </section>
          <section className="w-full my-3 md:my-5">
            <h1 className="text-xl font-sans text-black">
              4. <strong>Admin Right</strong>
            </h1>
            <p className="text-black font-sans text-xl pl-10 md:pl-20 mt-2 md:mt-4">
              Administrators have the right to monitor equipment usage, update
              inventory records, and modify user access in the system for
              effective inventory management.
            </p>
          </section>
          <section className="w-full my-3 md:my-5">
            <h1 className="text-xl font-sans text-black">
              5. <strong>System Security</strong>
            </h1>
            <p className="text-black font-sans text-xl pl-10 md:pl-20 mt-2 md:mt-4">
              EquickTrack employs security measures to protect user data and
              ensure safe transactions.
            </p>
            <p className="text-black font-sans text-xl pl-10 md:pl-20 mt-2 md:mt-4">
              Users are responsible for securing their login credentials and
              should report any suspicious activities to the admin.
            </p>
          </section>
          <section className="w-full my-3 md:my-5">
            <h1 className="text-xl font-sans text-black">
              6. <strong>Changes to Terms</strong>
            </h1>
            <p className="text-black font-sans text-xl pl-10 md:pl-20 mt-2 md:mt-4">
              EquickTrack reserves the right to update these terms. Users will
              be notified of any major changes and are encouraged to review the
              terms periodically.
            </p>
          </section>
        </div>
      </div>
    </Index>
  );
}
