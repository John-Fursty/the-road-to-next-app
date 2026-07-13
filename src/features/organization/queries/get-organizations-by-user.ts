import { getAuth } from "@/features/auth/queries/get-auth";
import { prisma } from "@/lib/prisma";

const getOrganizationsByUser = async () => {
  const { user } = await getAuth();

  // console.log("from getOrganizationsByUser", user);

  if (!user) {
    return [];
  }

  const organizations = await prisma.organization.findMany({
    where: {
      memberships: {
        some: {
          userId: user.id,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      memberships: {
        where: {
          userId: user.id,
        },
      },
      _count: {
        select: { memberships: true },
      },
    },
  });

  // console.log("from getOrganizationsByUser", organizations);

  return organizations.map(({ memberships, ...organizations }) => ({
    ...organizations,
    membershipByUser: memberships[0],
  }));
};

export { getOrganizationsByUser };
