import { format } from "date-fns";
import { getOrganizationsByUser } from "../queries/get-organizations-by-user";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LucideArrowLeftRight,
  LucideArrowUpRightFromSquare,
  LucideLoaderCircle,
  LucidePen,
  LucideTrash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrganizationSwitchButton } from "./organization-switch-button";
import { SubmitButton } from "@/components/form/submit-button";
import { OrganizationDeleteButton } from "./organization-delete-button";
import Link from "next/link";
import { membershipsPath } from "@/paths";
import { MembershipDeleteButton } from "@/features/membership/components/membership-delete-button";

type OrganizationListProps = {
  limitedAccess?: boolean;
};

const OrganizationList = async ({ limitedAccess }: OrganizationListProps) => {
  const organizations = await getOrganizationsByUser();

  const hasActive = organizations.some(
    (organization) => organization.membershipByUser.isActive,
  );

  // console.log("FROM OrganizationList", organizations);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-60">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Joined At</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>My Role</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {organizations.map((organization) => {
            const isActive = organization.membershipByUser.isActive;
            const isAmin =
              organization.membershipByUser.membershipRole === "ADMIN";

            const switchButton = (
              <OrganizationSwitchButton
                organizationId={organization.id}
                trigger={
                  <SubmitButton
                    icon={<LucideArrowLeftRight />}
                    label={
                      !hasActive ? "Activate" : isActive ? "Active" : "Switch"
                    }
                    variant={
                      !hasActive
                        ? "secondary"
                        : isActive
                          ? "default"
                          : "outline"
                    }
                  />
                }
              />
            );

            const detailButton = (
              <Button variant="outline" size="icon" asChild>
                <Link href={membershipsPath(organization.id)}>
                  <LucideArrowUpRightFromSquare className="w-4 h-4"></LucideArrowUpRightFromSquare>
                </Link>
              </Button>
            );

            const editButton = (
              <Button variant="outline" size="icon">
                <LucidePen className="w-4 h-4"></LucidePen>
              </Button>
            );

            const leaveButton = (
              <MembershipDeleteButton
                organizationId={organization.id}
                userId={organization.membershipByUser.userId}
              />
            );

            const deleteButton = (
              <OrganizationDeleteButton organizationId={organization.id} />
            );

            const placeholer = (
              <Button size="icon" disabled className="disabled:opacity-0" />
            );

            const buttons = (
              <>
                {switchButton}
                {limitedAccess ? null : isAmin ? detailButton : placeholer}
                {limitedAccess ? null : isAmin ? editButton : placeholer}
                {limitedAccess ? null : leaveButton}
                {limitedAccess ? null : isAmin ? deleteButton : placeholer}
              </>
            );

            return (
              <TableRow key={organization.id}>
                <TableCell>{organization.id}</TableCell>
                <TableCell>{organization.name}</TableCell>
                <TableCell>
                  {format(
                    organization.membershipByUser.joinedAt,
                    "yyyy-MM-dd, HH:mm",
                  )}
                </TableCell>
                <TableCell>{organization._count.memberships}</TableCell>
                <TableCell>
                  {organization.membershipByUser.membershipRole}
                </TableCell>
                <TableCell className="flex justify-end gap-x-2">
                  {buttons}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export { OrganizationList };
