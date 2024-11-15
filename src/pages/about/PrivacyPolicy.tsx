import Index from "./Index";

export default function PrivacyPolicy() {
  return (
    <Index>
      <div className="w-full h-full">
        <div className="w-full h-full py-8 md:py-10 md:px-20 px-5 sm:px-10">
          <h1 className="lg:text-3xl text-2xl font-sans text-center font-bold mb-5 md:mb-10 text-black">
            Equicktrack Privacy Policy
          </h1>
          <p className="text-black font-sans text-xl">
            EquickTrac, a system designed for managing laboratory equipment and
            optimizing inventory processes. This Privacy Policy informs users
            about the collection, use, and disclosure of personal information
            when using the EquickTrack platform.
          </p>

          <p className="text-black font-sans text-xl my-3 md:my-5">
            By accessing and using the platform, users agree to the collection
            and use of their information in accordance with this Privacy Policy.
          </p>

          <section className="w-full my-3 md:my-5">
            <h1 className="text-xl font-sans text-black">
              1. <strong>Information Collection and Use</strong>
            </h1>
            <p className="text-black font-sans text-xl pl-10 md:pl-20 mt-2 md:mt-4">
              EquickTrack collects personal information only when necessary to
              provide services related to its inventory system
            </p>
          </section>
          <section className="w-full my-3 md:my-5">
            <h1 className="text-xl font-sans text-black">
              2. <strong>Updating Account Information</strong>
            </h1>
            <p className="text-black font-sans text-xl pl-10 md:pl-20 mt-2 md:mt-4">
              Users may update or correct their account details at any time by
              logging into their account settings.
            </p>
          </section>
          <section className="w-full my-3 md:my-5">
            <h1 className="text-xl font-sans text-black">
              3. <strong>Changes to this Privacy Policy</strong>
            </h1>
            <p className="text-black font-sans text-xl pl-10 md:pl-20 mt-2 md:mt-4">
              Any changes to the policy will be posted on this page, and users
              are encouraged to review the policy regularly. Continued use of
              the platform after any changes to the Privacy Policy signifies
              users' acceptance of the revised terms
            </p>
          </section>
        </div>
      </div>
    </Index>
  );
}
