from rest_framework import viewsets


class EnhancedModelViewSet(viewsets.ModelViewSet):

    # add this to any serializer you want to use different serializer for each action on it
    # action_serializers = {
    #   "list": Serializer1, 
    #   "create": Serializer2,
    #   "retrieve":Serializer3, 
    #   "update" : Serializer4, 
    #   "partial_update" : Serializer5,
    #   "destroy" : Serializer6
    # }
    # if you don't set a serializer for an action, it will use the serializer_class default property

    def get_serializer_class(self):

        if hasattr(self, "action_serializers"):
            return self.action_serializers.get(self.action, self.serializer_class)

        return super(EnhancedModelViewSet, self).get_serializer_class()

    # -------------------------------------------------------------------------------------


    # add this to any serializer you want to use different permission for each action on it
    # action_permission_classes = {
    #   "list": [], 
    #   "create": [],
    #   "retrieve":[], 
    #   "update" : [], 
    #   "partial_update" : [],
    #   "destroy" : []
    # }

    def get_permissions(self):

        if hasattr(self, "action_permission_classes"):
            permission_classes = self.action_permission_classes.get(
                self.action, self.permission_classes
            )
            return [permission() for permission in permission_classes]

        return super().get_permissions()


    # -------------------------------------------------------------------------------------